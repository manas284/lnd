const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String
  },
  meetingLink: {
    type: String
  }
}, {
  timestamps: true
});

// Create index for faster queries by user and doctor
appointmentSchema.index({ userId: 1, doctorId: 1 });
appointmentSchema.index({ appointmentDate: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
