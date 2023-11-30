// UserController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// Function to generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
  };

  const options = {
    expiresIn: '24h', // Token expiration time
  };

  return jwt.sign(payload, 'your-secret-key', options);
};

// Signup controller
const signup = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate and send the JWT token
    const token = generateToken(savedUser);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user doesn't exist or the password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate and send the JWT token
    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { signup, login };
