// userRoutes.js

import express from 'express';
import {addChargingStation,getDashboardInfo,getAllChargingStations} from '../controllers/ChargingStation.js';

const router = express.Router();

// add route
router.post('/addChargingStation', addChargingStation);

// get route

router.get('/getDashboardInfo', getDashboardInfo);

router.get('/getAllChargingStations', getAllChargingStations);



export default router;
