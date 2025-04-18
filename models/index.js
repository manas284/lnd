// MongoDB models index file
// This replaces the Sequelize models index

// Import mongoose models
const User = require('./user');
const Appointment = require('./appointment');
const Doctor = require('./doctor');
const Prescription = require('./prescription');
const Rating = require('./rating');

// Export all models
module.exports = {
  User,
  Appointment,
  Doctor,
  Prescription,
  Rating
};
