import mongoose from 'mongoose';
import patientModel from '../model/patientModel.js';
import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator';

class patientController {
//////////////////////////////////////// CRUD operations
    static getAllPatient= async (req, res) => {
        try {
           
            const result = await patientModel.find();
            console.log(result);
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

        res.status(200).json("Login done");

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


}
export default patientController

