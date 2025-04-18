const { Appointment, User, Doctor } = require('../models');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason } = req.body;
    const userId = req.user.id;
    
    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Check if the time slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    if (existingAppointment) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }
    
    // Create new appointment
    const newAppointment = new Appointment({
      userId,
      doctorId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      reason,
      status: 'pending'
    });
    
    await newAppointment.save();
    
    return res.status(201).json({
      message: 'Appointment created successfully',
      appointment: newAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get user appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find appointments for the user
    const appointments = await Appointment.find({ userId })
      .populate('doctorId', 'userId specialization consultationFee')
      .populate({
        path: 'doctorId',
        populate: {
          path: 'userId',
          select: 'firstName lastName email profilePic'
        }
      })
      .sort({ appointmentDate: -1 });
    
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get doctor appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find doctor associated with the user
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Find appointments for the doctor
    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate('userId', 'firstName lastName email phoneNumber profilePic')
      .sort({ appointmentDate: -1 });
    
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, meetingLink, notes } = req.body;
    const userId = req.user.id;
    
    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Find doctor associated with the user
    const doctor = await Doctor.findOne({ userId });
    
    // Check if user is authorized to update the appointment
    if (!doctor || appointment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this appointment' });
    }
    
    // Update appointment
    appointment.status = status || appointment.status;
    appointment.meetingLink = meetingLink || appointment.meetingLink;
    appointment.notes = notes || appointment.notes;
    
    await appointment.save();
    
    return res.status(200).json({
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id;
    
    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if user is authorized to cancel the appointment
    if (appointment.userId.toString() !== userId && req.user.userType !== 'admin') {
      // Check if the user is the doctor for this appointment
      const doctor = await Doctor.findOne({ userId });
      if (!doctor || appointment.doctorId.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized to cancel this appointment' });
      }
    }
    
    // Update appointment status to cancelled
    appointment.status = 'cancelled';
    await appointment.save();
    
    return res.status(200).json({
      message: 'Appointment cancelled successfully',
      appointment
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id;
    
    // Find appointment
    const appointment = await Appointment.findById(appointmentId)
      .populate('userId', 'firstName lastName email phoneNumber profilePic')
      .populate({
        path: 'doctorId',
        populate: {
          path: 'userId',
          select: 'firstName lastName email profilePic'
        }
      });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if user is authorized to view the appointment
    if (appointment.userId._id.toString() !== userId && req.user.userType !== 'admin') {
      // Check if the user is the doctor for this appointment
      const doctor = await Doctor.findOne({ userId });
      if (!doctor || appointment.doctorId._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized to view this appointment' });
      }
    }
    
    return res.status(200).json({ appointment });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
