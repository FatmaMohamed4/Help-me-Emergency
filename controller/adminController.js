import mongoose from 'mongoose';
import adminModel from '../model/adminModel.js';
import { validationResult} from 'express-validator';
import bcryptjs from 'bcryptjs';

class adminCotroller{
    static getAllAdmins =async (req, res) => {
        try {
        const admins = await adminModel.find();
        console.log(admins);
        res.json(admins);
        } catch (error) {
            console.error('Error reading admins:', error);
            res.status(500).send('Internal Server Error');
          }
    }


    static registerAdmin = async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors.array());
            } else {
                try {
                    const { id, email, password, confirmPassword } = req.body;
                    const existingEmail = await adminModel.findOne({ email: email });
                    if (existingEmail) {
                        return res.status(409).json({ error: 'Admin with this email already exists' });
                    }
                    const existingID = await adminModel.findOne({ id: id });
                    if (existingID) {
                        return res.status(409).json({ error: 'This Admin ID already exists' });
                    }
        
                    // Hash the password before storing it in the database
                    const hashedPassword = await bcryptjs.hash(password, 10); // Increased the number of salt rounds to 10
        
                    if (password !== confirmPassword) {
                        return res.status(401).json({ error: 'Passwords do not match' }); // Corrected error message
                    }
                    
                    const newAdmin = {
                        id,
                        email,
                        password: hashedPassword,
                    };
                    
                    await adminModel.create(newAdmin); // Used create instead of insertMany for a single document insertion
                    res.status(201).json({ message: 'Registration successful' });
                } catch (error) {
                    console.error(error); // Log any caught error for debugging
                    res.status(500).json({ error: 'Internal server error' }); // Send internal server error response
                }
            }
        }
        
    
    
     static logInAdmin =  async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
             res.json (errors.array())
            }else {
              try {
  
                const { email, password } = req.body;

                const admin = await adminModel.findOne({ email:email });
            
                if (!admin) {
                  return res.status(401).json({ error: 'Invalid email' });
                }

                const isPasswordValid = await bcryptjs.compare(password, admin.password);
            
                if (!isPasswordValid ) {
                  return res.status(401).json({ error: 'Invalid password' });
                }

                res.status(200).json("Login done");
            
              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
              }
            }
            }     
}

export default adminCotroller