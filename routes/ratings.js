const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');
const auth = require('../middleware/auth');

// Public route
router.get('/doctor/:doctorId', ratingController.getDoctorRatings);

// Protected routes
router.use(auth);

// Submit a rating
router.post('/', ratingController.submitRating);

// Get user's ratings
router.get('/user', ratingController.getUserRatings);

// Update a rating
router.put('/:ratingId', ratingController.updateRating);

// Delete a rating
router.delete('/:ratingId', ratingController.deleteRating);

module.exports = router;