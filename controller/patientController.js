import mongoose from 'mongoose';
import patientModel from '../model/patientModel.js';
import bcryptjs from 'bcryptjs'
import  Jwt  from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import  QRCode  from 'qrcode';
import multer from 'multer'
import path from 'path'


import historyController from './historyController.js';
import historyModel from '../model/historyModel.js';



class patientController {
//////////////////////////////////////// CRUD operations
    static getAllPatient= async (req, res) => {
        try {
            const result = await patientModel.find();
            res.json(result);
          } catch (error) {
            console.error('Error reading patient:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static getPatientById = async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid patient ID' });
            }
        const result = await patientModel.findById({_id:id})
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ error: 'Patient not found' });
            }
        } catch (error) {
            console.error('Error reading Patient by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
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
                res.status(404).send('Patient not found');
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
                res.status(404).send('Patient not found');
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
                res.status(404).json({ error: 'Patient not found' });
            }
        } catch (error) {
            console.error('Error reading Patient by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
//////////////////////////////////////////// Authentications
static registerPatient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors.array());
    } else {
        try {
            const { name, email, password, confirmPassword, gender, phone, photo, location, qr } = req.body;

            // Check if the patient with the given email already exists
            const existingEmail = await patientModel.findOne({ email });
            if (existingEmail) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }

            const existingPhone = await patientModel.findOne({ phone });
            if (existingPhone) {
                return res.status(409).json({ error: 'This phone already exists' });
            }

            // if (password != confirmPassword){
            //     res.json({msg :"password does not match"})
            // }
            // Hash the password before storing it in the database
            const hashedPassword = await bcryptjs.hash(password, 10);

            // Create a new patient instance
            const newPatient = new patientModel({
                name,
                email,
                password: hashedPassword,
                confirmPassword: hashedPassword, // This may need adjustment based on your requirements
                gender,
                phone,
                photo,
                location,
                qr
            });

            // Save the new patient to the database
            await newPatient.save();

            res.status(201).json({ message: 'Registration successful' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


static LogInPatient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const { email, password } = req.body;

        const patient = await patientModel.findOne({ email });

        if (!patient) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        if (!patient.password) {
            return res.status(401).json({ error: 'No password found for the user' });
        }

        const isPasswordValid = await bcryptjs.compare(password, patient.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        let token = Jwt.sign({patientID : patient._id},'project1')
         // Set token as a cookie in the response
         res.cookie('token', token, { httpOnly: true })
        // res.status(200).json("Login done",token);
        res.status(200).json({ message: "Login done", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//not sure //
static logoutPatient = (req, res) => {
    // Check if the user is logged in by verifying the presence of the token
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'User not logged in' });
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
            res.json({ msg: "Patient not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

}

}

export default patientController 

