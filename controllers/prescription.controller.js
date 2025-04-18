const { Prescription, Appointment, Doctor } = require('../models');

// Create new prescription
exports.createPrescription = async (req, res) => {
  try {
    const { appointmentId, diagnosis, medicines, advice, followUpDate } = req.body;
    const userId = req.user.id;
    
    // Find doctor
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if doctor is authorized to create prescription for this appointment
    if (appointment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to create prescription for this appointment' });
    }
    
    // Check if prescription already exists for this appointment
    const existingPrescription = await Prescription.findOne({ appointmentId });
    if (existingPrescription) {
      return res.status(400).json({ message: 'Prescription already exists for this appointment' });
    }
    
    // Create new prescription
    const prescription = new Prescription({
      appointmentId,
      userId: appointment.userId,
      doctorId: doctor._id,
      diagnosis,
      medicines,
      advice,
      followUpDate: followUpDate ? new Date(followUpDate) : null
    });
    
    await prescription.save();
    
    // Update appointment status to completed
    appointment.status = 'completed';
    await appointment.save();
    
    return res.status(201).json({
      message: 'Prescription created successfully',
      prescription
    });
  } catch (error) {
    console.error('Error creating prescription:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get prescription by appointment ID
exports.getPrescriptionByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id;
    
    // Find prescription
    const prescription = await Prescription.findOne({ appointmentId })
      .populate({
        path: 'doctorId',
        populate: {
          path: 'userId',
          select: 'firstName lastName email profilePic'
        }
      })
      .populate('userId', 'firstName lastName email profilePic')
      .populate('appointmentId');
    
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    
    // Check if user is authorized to view this prescription
    if (prescription.userId._id.toString() !== userId) {
      // Check if the user is the doctor for this prescription
      const doctor = await Doctor.findOne({ userId });
      if (!doctor || prescription.doctorId._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized to view this prescription' });
      }
    }
    
    return res.status(200).json({ prescription });
  } catch (error) {
    console.error('Error fetching prescription:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get all prescriptions for a user
exports.getUserPrescriptions = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find prescriptions for the user
    const prescriptions = await Prescription.find({ userId })
      .populate({
        path: 'doctorId',
        populate: {
          path: 'userId',
          select: 'firstName lastName email profilePic'
        }
      })
      .populate('appointmentId')
      .sort({ createdAt: -1 });
    
    return res.status(200).json({ prescriptions });
  } catch (error) {
    console.error('Error fetching user prescriptions:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get all prescriptions created by a doctor
exports.getDoctorPrescriptions = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find doctor
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Find prescriptions created by the doctor
    const prescriptions = await Prescription.find({ doctorId: doctor._id })
      .populate('userId', 'firstName lastName email profilePic')
      .populate('appointmentId')
      .sort({ createdAt: -1 });
    
    return res.status(200).json({ prescriptions });
  } catch (error) {
    console.error('Error fetching doctor prescriptions:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update prescription
exports.updatePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const { diagnosis, medicines, advice, followUpDate } = req.body;
    const userId = req.user.id;
    
    // Find doctor
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Find prescription
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    
    // Check if doctor is authorized to update this prescription
    if (prescription.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this prescription' });
    }
    
    // Update prescription
    prescription.diagnosis = diagnosis || prescription.diagnosis;
    prescription.medicines = medicines || prescription.medicines;
    prescription.advice = advice || prescription.advice;
    prescription.followUpDate = followUpDate ? new Date(followUpDate) : prescription.followUpDate;
    
    await prescription.save();
    
    return res.status(200).json({
      message: 'Prescription updated successfully',
      prescription
    });
  } catch (error) {
    console.error('Error updating prescription:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
