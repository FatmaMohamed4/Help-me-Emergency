import mongoose from 'mongoose';
import pharmacyModel from '../model/pharmacyModel.js';

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
}


export default pharmacyeController