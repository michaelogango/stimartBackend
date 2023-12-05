// models/UserModel.js
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  
  // Admin-specific details
  numberOfStations: {
    type: Number,
    default: 0,
  },
  numberOfClickedStations: {
    type: Number,
    default: 0,
  },
  amountOfCharge: {
    type: Number,
    default: 0,
  },
  moneyReceived: {
    type: Number,
    default: 0,
  },
});

const User = model('User', userSchema);
export default User;
