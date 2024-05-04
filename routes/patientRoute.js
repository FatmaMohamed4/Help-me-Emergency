
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
patientRoute.patch('/reset',authController.resetPassword)
patientRoute.post('/verify',authController.protect,authController.verifyOTP)

// CRUD ==> All, byId, update, delete
patientRoute.get('/api/patient/all',authController.protect,authController.restrictTo(), patientController.getAllPatient);
patientRoute.get('/api/patient/:id',authController.protect,authController.restrictTo(), patientController.getPatientById);
patientRoute.put('/api/patient/:id',authController.protect,authController.restrictTo(), patientController.updatePatient);
patientRoute.delete('/api/patient/:id',authController.protect,authController.restrictTo(), patientController.deletePatient);

// patientRoute.get('/api/:email',authController.auth, patientController.getPatientByEmail);
patientRoute.get('/api/:email', authController.protect,patientController.getPatientByEmail);
patientRoute.get('/shareProfile/:email',authController.protect,patientController.shareProfile)
patientRoute.get('/logout',authController.protect,patientController.logoutPatient)
export default patientRoute;
