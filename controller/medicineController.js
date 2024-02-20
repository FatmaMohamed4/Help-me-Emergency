import mongoose from 'mongoose';
import medicineModel from '../model/medicineModel.js';

class medicineController {
    static getAllMedicine = async(req,res)=> {
        try {
           
            const result = await medicineModel.find()
            // console.log(result);
            res.json(result);
          } catch (error) {
            console.error('Error reading medicines:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static getOneMedicineById = async (req, res) => {
    try {
        

        const medicineID = req.params.id;
        const result = await medicineModel.findOne({ _id: medicineID });

        if (result) {
            res.header('Content-Type', 'application/json');
            res.send(JSON.stringify(result, null, 2));
        } else {
            res.status(404).send('Medicine not found');
        }
    } catch (error) {
        console.error('Error reading medicine by ID:', error);
        res.status(500).send('Internal Server Error');
    }
     }

    static createMedicine = async (req,res) =>{
        try {

            const newMedicineData = req.body;
        
        
              const existingMedicine = await medicineModel.findOne({ _id: newMedicineData.id });
        
              if (existingMedicine) {
                  res.send(`Medicine with ID ${newMedicineData.id} already exists.`);
              } else {
                 const result = await medicineModel.insertMany(newMedicineData);
                 if (result){
                  res.send('created');
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

    static deleteMedicineById =async (req, res) => {
      try {
        const id = req.params.id
          const result = await medicineModel.findByIdAndDelete({ _id:id });
      
            res.status(200).send('medicine deleted successfully');
          }
        
        catch (error) {
          console.error('Error deleting medicine by ID:', error);
          res.status(500).send('Internal Server Error');
        }
    }
 
    static updateMedicine = async (req, res) => {
        try {
            const id = req.params.id;
            const medicine = await medicineModel.findByIdAndUpdate(id, req.body, { new: true })
            if (medicine) {
                res.json(medicine);
            } else {
                res.status(404).send('Medicine not found');
            }
        } catch (error) {
            console.error('Error updating medicine:', error);
            res.status(500).send('Internal Server Error');
        }
    }


}


export default medicineController