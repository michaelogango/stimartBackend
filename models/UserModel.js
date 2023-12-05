// UserModel.js

import { Schema, model } from 'mongoose';

const chargingStationSchema = new Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  locationName: {
    type: String,
    required: true,
  },
});

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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer'],
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  dob: {
    type: Date,
  },
  chargingStations: [chargingStationSchema], 
});

const User = model('User', userSchema);
export default User;
