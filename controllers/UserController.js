// UserController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
  };

  const options = {
    expiresIn: '24h',
  };

  return jwt.sign(payload, 'your-secret-key', options);
};

const signup = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      username,
      email,
      password,
      role,
      location,
      phoneNumber,
      dob,
      chargingStations,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      dob,
    });

    console.log(role)

    if (role === 'Admin') {
      console.log('We are heeerrree')
      console.log(chargingStations)
      newUser.chargingStations = {
        location: {
          type: 'Point',
          coordinates: [chargingStations.coordinates[0], chargingStations.coordinates[1]],
        },
        locationName: chargingStations.name,
      };
    }
    console.log(newUser);
    
    newUser.numberOfStations += 1;
    newUser.amountOfCharge += 1;
    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    res.status(201).json({ token,role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = generateToken(user);

    res.json({ token, role: user.role }); // Sending the role separately for your current logic
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { signup,login };
