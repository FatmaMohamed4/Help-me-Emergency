import express, { Router, json, urlencoded } from 'express';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import morgan from 'morgan';
import mongoose from 'mongoose';
import multer from 'multer'


import { default as connectDB } from './connectDB.js';
import courseRoutes from './routes/courseRoute.js';
import adminRoute from './routes/adminRoute.js';
import emergencyRoute from './routes/emergencyRoute.js';
import historyRoute from './routes/historyRoute.js';
import patientRoute from './routes/patientRoute.js';
import medicineRoute from './routes/medicineRoute.js';
import pharmacyRoute from './routes/pharmacyRoute.js';
// import pharmacyRoute from './routes/pharmacyRoute.js';

// dotenv.config({ path: 'config.env' });


const app =express()
app.use(express.json())

  // Middleware to parse URL-encoded bodies
  app.use(urlencoded({ extended: true }));
  app.use(morgan('dev'));
 

// Start the server 
const PORT =4121;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB()

//Routes
app.use(adminRoute)
app.use(courseRoutes)
app.use(emergencyRoute)
app.use(historyRoute)
app.use(patientRoute)
app.use(medicineRoute)
app.use(pharmacyRoute)
// run correctly
// // app.use('*',(req,res)=>{
// //   res.json({msg :"Page not found"})
// // })

app.use('*', (req, res) => {
  res.json({ msg: "Cannot find the URL :" + req.originalUrl });
});

