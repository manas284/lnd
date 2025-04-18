const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const auth = require('../middleware/auth');

// Public routes
router.get('/', doctorController.getAllDoctors);
router.get('/:doctorId', doctorController.getDoctorById);
router.get('/:doctorId/available-slots/:date', doctorController.getAvailableTimeSlots);

// Protected routes
router.post('/profile', auth, doctorController.createOrUpdateProfile);
router.get('/profile/me', auth, doctorController.getMyProfile);
router.put('/availability', auth, doctorController.updateAvailability);

module.exports = router;