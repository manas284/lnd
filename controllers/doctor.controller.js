const { Doctor, User, Appointment, Rating } = require('../models');

// Create or update doctor profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      specialization,
      qualification,
      experience,
      consultationFee,
      availableDays,
      timeSlots,
      bio
    } = req.body;
    
    // Check if user exists and is a doctor
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.userType !== 'doctor') {
      return res.status(403).json({ message: 'Only doctors can create a doctor profile' });
    }
    
    // Find existing doctor profile or create new one
    let doctor = await Doctor.findOne({ userId });
    
    if (doctor) {
      // Update existing profile
      doctor.specialization = specialization || doctor.specialization;
      doctor.qualification = qualification || doctor.qualification;
      doctor.experience = experience || doctor.experience;
      doctor.consultationFee = consultationFee || doctor.consultationFee;
      doctor.availableDays = availableDays || doctor.availableDays;
      doctor.timeSlots = timeSlots || doctor.timeSlots;
      doctor.bio = bio || doctor.bio;
    } else {
      // Create new profile
      doctor = new Doctor({
        userId,
        specialization,
        qualification,
        experience,
        consultationFee,
        availableDays,
        timeSlots,
        bio
      });
    }
    
    await doctor.save();
    
    return res.status(200).json({
      message: 'Doctor profile updated successfully',
      doctor
    });
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get doctor profile by ID
exports.getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    // Find doctor and populate user details
    const doctor = await Doctor.findById(doctorId)
      .populate('userId', 'firstName lastName email profilePic');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Get ratings for the doctor
    const ratings = await Rating.find({ doctorId })
      .populate('userId', 'firstName lastName profilePic');
    
    return res.status(200).json({
      doctor,
      ratings
    });
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get doctor profile for the logged in doctor
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find doctor and populate user details
    const doctor = await Doctor.findOne({ userId })
      .populate('userId', 'firstName lastName email profilePic');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    return res.status(200).json({ doctor });
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const { specialization, sort } = req.query;
    
    // Build query
    let query = {};
    if (specialization) {
      query.specialization = specialization;
    }
    
    // Build sort options
    let sortOptions = {};
    if (sort === 'rating') {
      sortOptions = { rating: -1 };
    } else if (sort === 'experience') {
      sortOptions = { experience: -1 };
    } else {
      sortOptions = { createdAt: -1 };
    }
    
    // Find doctors and populate user details
    const doctors = await Doctor.find(query)
      .populate('userId', 'firstName lastName email profilePic')
      .sort(sortOptions);
    
    return res.status(200).json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update doctor availability
exports.updateAvailability = async (req, res) => {
  try {
    const userId = req.user.id;
    const { isAvailable } = req.body;
    
    // Find doctor
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Update availability
    doctor.isAvailable = isAvailable;
    await doctor.save();
    
    return res.status(200).json({
      message: 'Availability updated successfully',
      doctor
    });
  } catch (error) {
    console.error('Error updating doctor availability:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get available time slots for a doctor on a specific date
exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.params;
    
    // Find doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Check if the doctor is available on the selected date
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.toLocaleString('en-US', { weekday: 'long' });
    
    if (!doctor.availableDays.includes(dayOfWeek)) {
      return res.status(400).json({ message: 'Doctor is not available on this day' });
    }
    
    // Get all time slots for the doctor
    const allTimeSlots = doctor.timeSlots;
    
    // Get booked appointments for the selected date
    const bookedAppointments = await Appointment.find({
      doctorId,
      appointmentDate: {
        $gte: new Date(new Date(date).setHours(0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59))
      },
      status: { $in: ['pending', 'confirmed'] }
    });
    
    // Extract booked time slots
    const bookedTimeSlots = bookedAppointments.map(appointment => appointment.timeSlot);
    
    // Filter available time slots
    const availableTimeSlots = allTimeSlots.filter(slot => !bookedTimeSlots.includes(slot));
    
    return res.status(200).json({ availableTimeSlots });
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
