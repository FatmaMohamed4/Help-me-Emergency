import express, { Router, json, urlencoded } from 'express';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import morgan from 'morgan';
import mongoose from 'mongoose';


import { default as connectDB } from './connectDB.js';
import courseRoutes from './routes/courseRoute.js';

// dotenv.config({ path: 'config.env' });


const app =express()
app.use(express.json())

  // Middleware to parse URL-encoded bodies
  app.use(urlencoded({ extended: true }));
  app.use(morgan('dev'));
  // app.use(json());
  app.use(courseRoutes)

// Start the server 
const PORT =4121;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB()

