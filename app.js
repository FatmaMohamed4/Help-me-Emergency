import express from 'express'

import courseRoutes from './routes/courseRoute.js';
import emergencyRoute from './routes/emergencyRoute.js';
import historyRoute from './routes/historyRoute.js';
import patientRoute from './routes/patientRoute.js';
import medicineRoute from './routes/medicineRoute.js';
import pharmacyRoute from './routes/pharmacyRoute.js';
import photoRoute from './routes/photoRoute.js';
import postRoute from './routes/postRoute.js';


import  cors  from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

//Routes

app.use(courseRoutes)
app.use(emergencyRoute)
app.use(historyRoute)
app.use(patientRoute)
app.use(medicineRoute)
app.use(pharmacyRoute)
app.use(photoRoute)
app.use(postRoute)
app.use('*', (req, res) => {
  res.json({ msg: "Cannot find the URL :" + req.originalUrl });
});


app.use((err, req, res, next) => {
  // Handle errors here
  console.error(err);

  // Set a default error status code if not already set
  if (!res.statusCode || res.statusCode < 400) {
    res.status(500); // Internal Server Error
  }

  // Send error response
  res.json({ error: err.message || 'Internal Server Error' });
});


export default app