// userRoutes.js

import express from 'express';
import {addChargingStation,getDashboardInfo} from '../controllers/ChargingStation.js';

const router = express.Router();

// add route
router.post('/addChargingStation', addChargingStation);

// get route

router.get('/getDashboardInfo', getDashboardInfo);



export default router;
