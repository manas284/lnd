const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Create a new appointment
router.post('/', appointmentController.createAppointment);

// Get user appointments
router.get('/user', appointmentController.getUserAppointments);

// Get doctor appointments
router.get('/doctor', appointmentController.getDoctorAppointments);

// Get appointment by ID
router.get('/:appointmentId', appointmentController.getAppointmentById);

// Update appointment status (doctor only)
router.put('/:appointmentId/status', appointmentController.updateAppointmentStatus);

// Cancel appointment
router.put('/:appointmentId/cancel', appointmentController.cancelAppointment);

module.exports = router;