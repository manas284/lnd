const mongoose = require('mongoose');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import MongoDB models
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');
const Prescription = require('../models/prescription');
const Rating = require('../models/rating');

// MongoDB connection
const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lnd_app';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// PostgreSQL connection
const pgConfig = {
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  database: process.env.PGDATABASE || 'lnd_db',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
};

const pgPool = new Pool(pgConfig);

// Migration functions
const migrateUsers = async () => {
  console.log('Migrating users...');
  
  try {
    // Get all users from PostgreSQL
    const { rows: pgUsers } = await pgPool.query(`
      SELECT * FROM users
    `);
    
    console.log(`Found ${pgUsers.length} users in PostgreSQL`);
    
    // Create MongoDB user documents
    for (const pgUser of pgUsers) {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: pgUser.first_name,
        lastName: pgUser.last_name,
        email: pgUser.email,
        password: pgUser.password, // Note: passwords are already hashed
        address: pgUser.address,
        phoneNumber: pgUser.phone_number,
        dateOfBirth: pgUser.date_of_birth,
        userType: pgUser.user_type,
        profilePic: pgUser.profile_pic,
        isActive: pgUser.is_active,
        createdAt: pgUser.created_at,
        updatedAt: pgUser.updated_at
      });
      
      // Map PostgreSQL ID to MongoDB _id for later use
      pgUser.mongoId = user._id;
      
      await user.save();
    }
    
    console.log('Users migration completed');
    return pgUsers;
  } catch (error) {
    console.error('Error migrating users:', error);
    throw error;
  }
};

const migrateDoctors = async (pgUsers) => {
  console.log('Migrating doctors...');
  
  try {
    // Get all doctors from PostgreSQL
    const { rows: pgDoctors } = await pgPool.query(`
      SELECT * FROM doctors
    `);
    
    console.log(`Found ${pgDoctors.length} doctors in PostgreSQL`);
    
    // Create MongoDB doctor documents
    for (const pgDoctor of pgDoctors) {
      // Find the corresponding user
      const pgUser = pgUsers.find(u => u.id === pgDoctor.user_id);
      
      if (!pgUser) {
        console.warn(`No user found for doctor with user_id ${pgDoctor.user_id}`);
        continue;
      }
      
      const doctor = new Doctor({
        _id: new mongoose.Types.ObjectId(),
        userId: pgUser.mongoId,
        specialization: pgDoctor.specialization,
        qualification: pgDoctor.qualification,
        experience: pgDoctor.experience,
        consultationFee: pgDoctor.consultation_fee,
        availableDays: pgDoctor.available_days,
        timeSlots: pgDoctor.time_slots,
        bio: pgDoctor.bio,
        isAvailable: pgDoctor.is_available,
        rating: pgDoctor.rating,
        totalRatings: pgDoctor.total_ratings,
        createdAt: pgDoctor.created_at,
        updatedAt: pgDoctor.updated_at
      });
      
      // Map PostgreSQL ID to MongoDB _id for later use
      pgDoctor.mongoId = doctor._id;
      
      await doctor.save();
    }
    
    console.log('Doctors migration completed');
    return pgDoctors;
  } catch (error) {
    console.error('Error migrating doctors:', error);
    throw error;
  }
};

const migrateAppointments = async (pgUsers, pgDoctors) => {
  console.log('Migrating appointments...');
  
  try {
    // Get all appointments from PostgreSQL
    const { rows: pgAppointments } = await pgPool.query(`
      SELECT * FROM appointments
    `);
    
    console.log(`Found ${pgAppointments.length} appointments in PostgreSQL`);
    
    // Create MongoDB appointment documents
    for (const pgAppointment of pgAppointments) {
      // Find the corresponding user and doctor
      const pgUser = pgUsers.find(u => u.id === pgAppointment.user_id);
      const pgDoctor = pgDoctors.find(d => d.id === pgAppointment.doctor_id);
      
      if (!pgUser || !pgDoctor) {
        console.warn(`No user or doctor found for appointment ${pgAppointment.id}`);
        continue;
      }
      
      const appointment = new Appointment({
        _id: new mongoose.Types.ObjectId(),
        userId: pgUser.mongoId,
        doctorId: pgDoctor.mongoId,
        appointmentDate: pgAppointment.appointment_date,
        timeSlot: pgAppointment.time_slot,
        reason: pgAppointment.reason,
        status: pgAppointment.status,
        notes: pgAppointment.notes,
        meetingLink: pgAppointment.meeting_link,
        createdAt: pgAppointment.created_at,
        updatedAt: pgAppointment.updated_at
      });
      
      // Map PostgreSQL ID to MongoDB _id for later use
      pgAppointment.mongoId = appointment._id;
      
      await appointment.save();
    }
    
    console.log('Appointments migration completed');
    return pgAppointments;
  } catch (error) {
    console.error('Error migrating appointments:', error);
    throw error;
  }
};

const migratePrescriptions = async (pgUsers, pgDoctors, pgAppointments) => {
  console.log('Migrating prescriptions...');
  
  try {
    // Get all prescriptions from PostgreSQL
    const { rows: pgPrescriptions } = await pgPool.query(`
      SELECT * FROM prescriptions
    `);
    
    console.log(`Found ${pgPrescriptions.length} prescriptions in PostgreSQL`);
    
    // Create MongoDB prescription documents
    for (const pgPrescription of pgPrescriptions) {
      // Find the corresponding user, doctor, and appointment
      const pgUser = pgUsers.find(u => u.id === pgPrescription.user_id);
      const pgDoctor = pgDoctors.find(d => d.id === pgPrescription.doctor_id);
      const pgAppointment = pgAppointments.find(a => a.id === pgPrescription.appointment_id);
      
      if (!pgUser || !pgDoctor || !pgAppointment) {
        console.warn(`Missing reference for prescription ${pgPrescription.id}`);
        continue;
      }
      
      // Get prescription medicines from PostgreSQL
      const { rows: pgMedicines } = await pgPool.query(`
        SELECT * FROM prescription_medicines WHERE prescription_id = $1
      `, [pgPrescription.id]);
      
      // Format medicines for MongoDB
      const medicines = pgMedicines.map(med => ({
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        duration: med.duration,
        notes: med.notes
      }));
      
      const prescription = new Prescription({
        _id: new mongoose.Types.ObjectId(),
        appointmentId: pgAppointment.mongoId,
        userId: pgUser.mongoId,
        doctorId: pgDoctor.mongoId,
        diagnosis: pgPrescription.diagnosis,
        medicines: medicines,
        advice: pgPrescription.advice,
        followUpDate: pgPrescription.follow_up_date,
        createdAt: pgPrescription.created_at,
        updatedAt: pgPrescription.updated_at
      });
      
      await prescription.save();
    }
    
    console.log('Prescriptions migration completed');
  } catch (error) {
    console.error('Error migrating prescriptions:', error);
    throw error;
  }
};

const migrateRatings = async (pgUsers, pgDoctors, pgAppointments) => {
  console.log('Migrating ratings...');
  
  try {
    // Get all ratings from PostgreSQL
    const { rows: pgRatings } = await pgPool.query(`
      SELECT * FROM ratings
    `);
    
    console.log(`Found ${pgRatings.length} ratings in PostgreSQL`);
    
    // Create MongoDB rating documents
    for (const pgRating of pgRatings) {
      // Find the corresponding user, doctor, and appointment
      const pgUser = pgUsers.find(u => u.id === pgRating.user_id);
      const pgDoctor = pgDoctors.find(d => d.id === pgRating.doctor_id);
      const pgAppointment = pgAppointments.find(a => a.id === pgRating.appointment_id);
      
      if (!pgUser || !pgDoctor || !pgAppointment) {
        console.warn(`Missing reference for rating ${pgRating.id}`);
        continue;
      }
      
      const rating = new Rating({
        _id: new mongoose.Types.ObjectId(),
        userId: pgUser.mongoId,
        doctorId: pgDoctor.mongoId,
        appointmentId: pgAppointment.mongoId,
        rating: pgRating.rating,
        review: pgRating.review,
        createdAt: pgRating.created_at,
        updatedAt: pgRating.updated_at
      });
      
      await rating.save();
    }
    
    console.log('Ratings migration completed');
  } catch (error) {
    console.error('Error migrating ratings:', error);
    throw error;
  }
};

// Main migration function
const migrateData = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    
    console.log('Starting migration from PostgreSQL to MongoDB...');
    
    // Migrate data in order
    const pgUsers = await migrateUsers();
    const pgDoctors = await migrateDoctors(pgUsers);
    const pgAppointments = await migrateAppointments(pgUsers, pgDoctors);
    await migratePrescriptions(pgUsers, pgDoctors, pgAppointments);
    await migrateRatings(pgUsers, pgDoctors, pgAppointments);
    
    console.log('Migration completed successfully');
    
    // Close connections
    await mongoose.connection.close();
    await pgPool.end();
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

// Execute migration
migrateData();
