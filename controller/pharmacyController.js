import mongoose from 'mongoose';
import pharmacyModel from '../model/pharmacyModel.js';
import slugify from 'slugify';
import patientController from './patientController.js';
import patientModel from '../model/patientModel.js';

class pharmacyeController {
    
    static getAllPharmacy= async(req,res)=> {
        try {
           
            const result = await pharmacyModel.find()
            res.json(result);
          } catch (error) {
            console.error('Error reading phaarmacies:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static getOnePharmacyById = async (req, res) => {
    try {
        

        const pid = req.params.id;
        const result = await pharmacyModel.findOne({ _id: pid });

        if (result) {
            res.header('Content-Type', 'application/json');
            res.send(JSON.stringify(result, null, 2));
        } else {
            res.status(404).send('Pharmacy not found');
        }
    } catch (error) {
        console.error('Error reading Pharmacy by ID:', error);
        res.status(500).send('Internal Server Error');
    }
     }

     static getOnePharmacyByName = async (req, res) => {
        try {
            const name = req.params.name;

        const result = await pharmacyModel.find({name:name}).select('-patientId')

            
            if (result) {
                res.json(result);
            
            } else {
                res.status(404).json({ error: 'Pharmacy not found' });
            }
        } catch (error) {
            console.error('Error reading Pharmacy by name:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
     }

    static addPharmay = async (req,res) =>{
        try {

            const newPharmacy = req.body;
        
        
              const existPharmact = await pharmacyModel.findOne({ _id: newPharmacy.id });
        
              if (existPharmact) {
                  res.send(`Medicine with ID ${newPharmacy.id} already exists.`);
              } else {
                 const result = await pharmacyModel.insertMany(newPharmacy);
                 if (result){
                  res.send('Added');
                  } else {
                  res.send('failed');
                }
            console.log(result);
            
          } 
        }catch (error) {
            console.error('Error creating new medicine:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static deletePharmacy =async (req, res) => {
      try {
        const id = req.params.id
          const result = await pharmacyModel.findByIdAndDelete({ _id:id });
      
            res.status(200).send('pharmacy deleted successfully');
          }
        
        catch (error) {
          console.error('Error deleting pharmacy by ID:', error);
          res.status(500).send('Internal Server Error');
        }
    }
 
    static updatePharmacy = async (req, res) => {
        try {
            const id = req.params.id;
            const Pharmacy = await pharmacyModel.findByIdAndUpdate(id, req.body, { new: true })
            if (Pharmacy) {
                res.json(Pharmacy);
            } else {
                res.status(404).send('Pharmacy not found');
            }
        } catch (error) {
            console.error('Error updating Pharmacy:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static filterPharmacy = async (req, res) => {
        try {
            const location = req.body.location;
    
            // Slugify the location
            const slug = slugify(location, {
                lower: true,    // Convert to lower case
                strict: true    // Remove any special characters
            });
    
            // Create a regular expression for case-insensitive matching
            const regex = new RegExp(`^${slug}$`, 'i');
    
            // Query the database using the regular expression
            const result = await pharmacyModel.find({ location: regex }).select({ _id: 0, id: 0, patientLocation: 0 });
    
            if (result && result.length > 0) {
                res.header('Content-Type', 'application/json');
                res.send(JSON.stringify(result, null, 2));
            } else {
                res.status(404).send('Location not found');
            }
        } catch (error) {
            console.error('Error reading Pharmacy by Location:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    static nearPharmacy = async (req, res) => {
        const id = req.params.id;
        try {
            // Find the patient by _id
            const patient = await patientModel.findById(id);
    
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
    
            // Check if patient has a location
            if (patient.location) {
                // Find pharmacies near the patient's location
                const pharmacies = await pharmacyModel.find({ location: patient.location });
    
                res.json(pharmacies);
            } else {
                res.status(404).json({ message: 'Patient location not found' });
            }
        } catch (error) {
            console.error('Error reading nearby pharmacies:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
//run 
  //   static filterPharmacy = async (req, res) => {
  //     try {
  //         const location = req.body.location;
  //         const result = await pharmacyModel.find({ location: location }).select({ _id: 0 ,id:0,patientLocation:0});
  
  //         if (result && result.length > 0) {
  //             res.header('Content-Type', 'application/json');
  //             res.send(JSON.stringify(result, null, 2));
  //         } else {
  //             res.status(404).send('Location not found');
  //         }
  //     } catch (error) {
  //         console.error('Error reading Pharmacy by Location:', error);
  //         res.status(500).send('Internal Server Error');
  //     }
  // };

}


export default pharmacyeController