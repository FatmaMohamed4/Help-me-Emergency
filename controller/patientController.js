import mongoose from 'mongoose';
import  QRCode  from 'qrcode';
import patientModel from '../model/patientModel.js';
import catchError from '../utilites/catchError.js';
import AppError from '../utilites/AppError.js';
// import bcryptjs from 'bcryptjs'
// import  Jwt  from 'jsonwebtoken';
// import { validationResult } from 'express-validator';

// import multer from 'multer'
// import path from 'path'
// import historyController from './historyController.js';
// import historyModel from '../model/historyModel.js';




class patientController {
//////////////////////////////////////// CRUD operations
    static getAllPatient= catchError(async (req, res,next) => {
        
            const result = await patientModel.find();
            res.json(result);
          
    })

    static getPatientById = catchError(async (req, res) => {

            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid patient ID' });
            }
            const result = await patientModel.findById({_id:id})
            if (result) {
                res.status(200).json({message : true
                    ,result});
            } else {
                return next(new AppError('Patient not found',404))
            }
    })
    
    static updatePatient = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await patientModel.findByIdAndUpdate(id, req.body, { new: true });
            // let token = req.headers;
            // console.log(token)
            // // Jwt.verify(,'project1')
            if (result) {
                res.json({ msg: "Updated patient", result });
            } else {
                return next(new AppError('Patient not found',404))
            }
        } catch (error) {
            console.error('Error updating Patient:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    static deletePatient = async (req, res) => {
        try {
            const id = req.params.id; // Accessing ID from URL parameters
            const deletedPatient = await patientModel.findByIdAndDelete(id);
    
            if (deletedPatient) {
                res.json({ msg: "Patient deleted successfully" });
            } else {
                return next(new AppError('Patient not found',404))
            }
        } catch (error) {
            console.error('Error deleting Patient:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static getPatientByEmail =async (req,res)=>{
        try {
            const email = req.params.email;

        const result = await patientModel.find({email:email})

            
            if (result) {
                res.json(result);
            
            } else {
                return next(new AppError('Patient not found',404))
            }
        } catch (error) {
            console.error('Error reading Patient by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

//not sure //Chat GPT
static logoutPatient = (req, res) => {
    // Check if the user is logged in by verifying the presence of the token
    const token = req.cookies.token;

    if (!token) {
        return next(new AppError('Please log in ',403))
    }

    try {
        
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getDays() - 1);

        // Clear the token cookie by setting an empty token with an expiration date
        res.cookie('token', '', { expires: expirationDate, httpOnly: true });

        // Respond with a message indicating successful logout
        res.status(200).json({ message: 'Logout successful' });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}
//////////////////////////////////////////// run QR code 
static shareProfile =async (req,res) =>{
    // run correctly
const email = req.params.email;

    try {
        const patient = await patientModel.findOne({ email: email }).select('-password -confirmPassword -createdAt -updatedAt');
        
        if (patient) {
            const patientData = JSON.stringify(patient);

            QRCode.toDataURL(patientData, (err, qrDataUrl) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    // Send the QR code image directly to the browser
                    res.writeHead(200, {
                        'Content-Type': 'image/png',
                        'Content-Length': qrDataUrl.length
                    });
                    res.end(Buffer.from(qrDataUrl.split('base64,')[1], 'base64'));
                }
            });
        } else {
            return next(new AppError('Patient not found',404))
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

}

}

export default patientController 

