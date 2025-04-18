const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription.controller');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Create a new prescription (doctor only)
router.post('/', prescriptionController.createPrescription);

// Get prescription by appointment ID
router.get('/appointment/:appointmentId', prescriptionController.getPrescriptionByAppointment);

// Get all prescriptions for a user
router.get('/user', prescriptionController.getUserPrescriptions);

// Get all prescriptions created by a doctor
router.get('/doctor', prescriptionController.getDoctorPrescriptions);

// Update prescription (doctor only)
router.put('/:prescriptionId', prescriptionController.updatePrescription);

module.exports = router;