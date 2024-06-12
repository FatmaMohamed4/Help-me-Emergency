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
import  asyncHandler  from 'express-async-handler';




class patientController {
//////////////////////////////////////// CRUD operations
    static getAllPatient= catchError(async (req, res,next) => {
        
            const result = await patientModel.find();
            res.json(result);
          
    })

    static getPatientById = asyncHandler(async (req, res) => {

            const id = req.params.id;
            const result = await patientModel.findById({_id:id})
            
            if (result) {
                res.status(200).json({message : true
                    ,result});
            } else {
                return (new AppError('Patient not found',404))
            }
    })
    
    static updatePatient = asyncHandler(async (req, res,next) => {
      
            const id = req.params.id;
            const result = await patientModel.findByIdAndUpdate(id, req.body, { new: true });
            // let token = req.headers;
            // console.log(token)
            // // Jwt.verify(,'project1')
            if (!result) {
                return next(new AppError('Patient not found',404))
            
            } else {
                res.json({ msg: "Updated patient", result });
            }
    })
    
    static deletePatient = async (req, res) => {
        try {
            const id = req.params.id; 
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
// //////////////////////////////////////////// run QR code 

static shareProfile = async (req, res, next) => {
    const email = req.params.email;

    try {
        const patient = await patientModel.findOne({ email }).select('-password -confirmPassword -createdAt -updatedAt ');
        
        if (!patient) {
            return next(new AppError('Patient not found', 404));
        }

        const patientData = JSON.stringify(patient);

        QRCode.toDataURL(patientData, (err, qrDataUrl) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Send the QR code image directly to the browser
            const base64Data = qrDataUrl.split('base64,')[1];
            const imgBuffer = Buffer.from(base64Data, 'base64');

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': imgBuffer.length
            });
            res.end(imgBuffer);
        });
    } catch (err) {
        console.error(err);
        next(new AppError('Internal server error', 500));
    }
}
}

export default patientController 

