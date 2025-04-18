const { Rating, Appointment, Doctor } = require('../models');

// Submit a rating for a doctor
exports.submitRating = async (req, res) => {
  try {
    const { appointmentId, rating, review } = req.body;
    const userId = req.user.id;
    
    // Check if the appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if the user is authorized to rate this appointment
    if (appointment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to rate this appointment' });
    }
    
    // Check if the appointment is completed
    if (appointment.status !== 'completed') {
      return res.status(400).json({ message: 'Cannot rate an appointment that is not completed' });
    }
    
    // Check if a rating already exists for this appointment
    const existingRating = await Rating.findOne({ appointmentId });
    if (existingRating) {
      return res.status(400).json({ message: 'Rating already submitted for this appointment' });
    }
    
    // Create new rating
    const newRating = new Rating({
      userId,
      doctorId: appointment.doctorId,
      appointmentId,
      rating,
      review
    });
    
    await newRating.save();
    
    // Update doctor's average rating
    const doctor = await Doctor.findById(appointment.doctorId);
    const allRatings = await Rating.find({ doctorId: appointment.doctorId });
    
    // Calculate new average rating
    const totalRating = allRatings.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalRating / allRatings.length;
    
    // Update doctor's rating
    doctor.rating = averageRating;
    doctor.totalRatings = allRatings.length;
    await doctor.save();
    
    return res.status(201).json({
      message: 'Rating submitted successfully',
      rating: newRating
    });
  } catch (error) {
    console.error('Error submitting rating:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get ratings for a doctor
exports.getDoctorRatings = async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Get all ratings for the doctor
    const ratings = await Rating.find({ doctorId })
      .populate('userId', 'firstName lastName profilePic')
      .sort({ createdAt: -1 });
    
    return res.status(200).json({ ratings });
  } catch (error) {
    console.error('Error fetching doctor ratings:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get ratings submitted by a user
exports.getUserRatings = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get all ratings submitted by the user
    const ratings = await Rating.find({ userId })
      .populate({
        path: 'doctorId',
        populate: {
          path: 'userId',
          select: 'firstName lastName email profilePic'
        }
      })
      .populate('appointmentId')
      .sort({ createdAt: -1 });
    
    return res.status(200).json({ ratings });
  } catch (error) {
    console.error('Error fetching user ratings:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update a rating
exports.updateRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user.id;
    
    // Find the rating
    const ratingObj = await Rating.findById(ratingId);
    if (!ratingObj) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    
    // Check if user is authorized to update this rating
    if (ratingObj.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this rating' });
    }
    
    // Update rating
    ratingObj.rating = rating || ratingObj.rating;
    ratingObj.review = review || ratingObj.review;
    
    await ratingObj.save();
    
    // Update doctor's average rating
    const doctor = await Doctor.findById(ratingObj.doctorId);
    const allRatings = await Rating.find({ doctorId: ratingObj.doctorId });
    
    // Calculate new average rating
    const totalRating = allRatings.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalRating / allRatings.length;
    
    // Update doctor's rating
    doctor.rating = averageRating;
    await doctor.save();
    
    return res.status(200).json({
      message: 'Rating updated successfully',
      rating: ratingObj
    });
  } catch (error) {
    console.error('Error updating rating:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const userId = req.user.id;
    
    // Find the rating
    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    
    // Check if user is authorized to delete this rating
    if (rating.userId.toString() !== userId && req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this rating' });
    }
    
    // Get doctor ID before deleting rating
    const doctorId = rating.doctorId;
    
    // Delete rating
    await Rating.findByIdAndDelete(ratingId);
    
    // Update doctor's average rating
    const doctor = await Doctor.findById(doctorId);
    const allRatings = await Rating.find({ doctorId });
    
    if (allRatings.length > 0) {
      // Calculate new average rating
      const totalRating = allRatings.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = totalRating / allRatings.length;
      
      // Update doctor's rating
      doctor.rating = averageRating;
      doctor.totalRatings = allRatings.length;
    } else {
      // No ratings left
      doctor.rating = 0;
      doctor.totalRatings = 0;
    }
    
    await doctor.save();
    
    return res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (error) {
    console.error('Error deleting rating:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
