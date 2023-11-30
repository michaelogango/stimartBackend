// Import necessary modules
import { Schema, model } from 'mongoose';

// Define the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add other properties as needed, such as email, role, etc.
  role: {
    type: String,
    enum: ['host', 'passenger'],
    required: true,
  },
  // Additional fields for host
  chargingStations: [{
    location: {
      type: String,
      required: function () {
        return this.role === 'host';
      },
    },
    // Add other charging station details as needed
  }],
});

// Create and export the User model
const User = model('User', userSchema);
export default User;
