// controllers/chargingStationController.js
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const addChargingStation = async (req, res) => {
  const { token, location, locationName } = req.body;
console.log(token)
console.log("location",location)
  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'your-secret-key'); // Replace 'your_secret_key' with your actual secret key used for signing tokens
    console.log(decodedToken);

    // Find the user associated with the token
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token or user not found' });
    }

    // Check if the user is an admin
    if (user.role !== 'Admin') {
      return res.status(403).json({ error: 'Unauthorized. Only admins can add charging stations' });
    }

    // Create a new charging station
    const newChargingStation = {
        location: {
            type: 'Point',
            coordinates: [location[0], location[1]],
          },      
          locationName,
      user: user._id, // Reference to the user
    };

    console.log("this is new charging location",newChargingStation);
    user.numberOfStations += 1;
    user.amountOfCharge += 1;

    // Add the new charging station to the user's chargingStations array
    user.chargingStations.push(newChargingStation);
    console.log("this is user",user)

    // Save the updated user
    await user.save();

    return res.status(201).json({ message: 'Charging station added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDashboardInfo = async (req, res) => {
    const { token } = req.query; // Access token from query parameters
    console.log('hit this route')
    console.log(token)
  
    try {
      // Verify the JWT token
      const decodedToken = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key used for signing tokens
  
      // Find the user associated with the token
      const user = await User.findById(decodedToken.id);
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid token or user not found' });
      }
  
      // Check if the user is an admin
      if (user.role !== 'Admin') {
        return res.status(403).json({ error: 'Unauthorized. Only admins can access dashboard information' });
      }
  
      // Get dashboard information
      const dashboardInfo = {
        numberOfStations: user.numberOfStations,
        moneyReceived: 0,
        amountOfCharge:0,
      };
  
      return res.status(200).json(dashboardInfo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export  {addChargingStation,getDashboardInfo};
