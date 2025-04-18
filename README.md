# LND Healthcare App - MongoDB Version

## Description
This is a healthcare application that allows patients to schedule appointments with doctors, receive prescriptions, and rate their experiences. This version of the application uses MongoDB as the database backend.

## Features
- User registration and authentication (patients and doctors)
- Doctor profile management
- Appointment scheduling and management
- Prescription management
- Doctor ratings and reviews

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JSON Web Tokens (JWT) for authentication
- EJS for view templates

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/lnd.git
cd lnd
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

4. Start the server:
```
npm start
```

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change user password

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:doctorId` - Get doctor by ID
- `POST /api/doctors/profile` - Create or update doctor profile
- `GET /api/doctors/profile/me` - Get current doctor profile
- `PUT /api/doctors/availability` - Update doctor availability
- `GET /api/doctors/:doctorId/available-slots/:date` - Get available time slots

### Appointments
- `POST /api/appointments` - Create a new appointment
- `GET /api/appointments/user` - Get user appointments
- `GET /api/appointments/doctor` - Get doctor appointments
- `GET /api/appointments/:appointmentId` - Get appointment by ID
- `PUT /api/appointments/:appointmentId/status` - Update appointment status
- `PUT /api/appointments/:appointmentId/cancel` - Cancel appointment

### Prescriptions
- `POST /api/prescriptions` - Create a new prescription
- `GET /api/prescriptions/appointment/:appointmentId` - Get prescription by appointment ID
- `GET /api/prescriptions/user` - Get user prescriptions
- `GET /api/prescriptions/doctor` - Get doctor prescriptions
- `PUT /api/prescriptions/:prescriptionId` - Update prescription

### Ratings
- `POST /api/ratings` - Submit a rating
- `GET /api/ratings/doctor/:doctorId` - Get doctor ratings
- `GET /api/ratings/user` - Get user ratings
- `PUT /api/ratings/:ratingId` - Update rating
- `DELETE /api/ratings/:ratingId` - Delete rating

## Database Migration
This project includes a migration script that can be used to transfer data from a PostgreSQL database to MongoDB. The migration script is located in the `migrations` directory.

To run the migration:
```
node migrations/mongodb-migration.js
```

## License
[MIT](https://choosealicense.com/licenses/mit/)