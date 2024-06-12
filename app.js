import express from 'express'

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
import commentRoute from './routes/commentRoute.js';
import globalError from './middleware/errMiddleware.js';
import diseasesRoute from './routes/diseasesRoute.js';
import categoryRoute from './routes/categoryRoute.js';
dotenv.config(); 

//Routes

app.use(emergencyRoute)
app.use(historyRoute)
app.use(patientRoute)
app.use(medicineRoute)
app.use(pharmacyRoute)
app.use(photoRoute)
app.use(postRoute)
app.use(commentRoute)
app.use(diseasesRoute)
app.use(categoryRoute)


app.use('*', (req, res) => {
  res.json({ msg: "Cannot find the URL :" + req.originalUrl });
});


// Global Error handling
app.use(globalError);


export default app