
import express from "express";
import { check } from "express-validator";
import patientController from "../controller/patientController.js";
import authController from "../controller/authController.js";


const patientRoute = express.Router();

// Register
patientRoute.post('/register',authController.registerPatient);
// Log in
patientRoute.post('/login',authController.LogInPatient);
// forget Password 
patientRoute.post('/sendCode', authController.forgotPassword);
patientRoute.patch('/reset' ,authController.protect,authController.resetPassword)
patientRoute.post('/verify',authController.verifyOTP)

// CRUD ==> All, byId, update, delete
patientRoute.get('/api/patient/all' , patientController.getAllPatient);
patientRoute.get('/api/patient/:id', patientController.getPatientById);
patientRoute.patch('/api/patient/:id', patientController.updatePatient);
patientRoute.delete('/api/patient/:id', patientController.deletePatient);

// patientRoute.get('/api/:email',authController.auth, patientController.getPatientByEmail);
patientRoute.get('/api/:email',patientController.getPatientByEmail);

// QR code 

patientRoute.get('/shareProfile/:email',patientController.shareProfile)
patientRoute.get('/logout',patientController.logoutPatient)
export default patientRoute;
