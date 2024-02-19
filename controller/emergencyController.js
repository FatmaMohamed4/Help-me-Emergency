import mongoose from 'mongoose';
import emergencyModel from '../model/emergencyModel.js';
class emergencyController {
    static getAll= async (req, res) => {
     try {
        
         const courses = await emergencyModel.find()
         res.json(courses);
       } catch (error) {
         console.error('Error reading emergencies:', error);
         res.status(500).send('Internal Server Error');
       }
     }

     static  getById= async (req, res) => {
      try {

          const emergencyId = req.params.id;

          const result = await emergencyModel.find({ id: emergencyId });
          if (result) {
            res.header('Content-Type', 'application/json');
            res.send(JSON.stringify(result, null, 2));
          } else {
            res.status(404).send('Emergency not found');
          }
        } catch (error) {
          console.error('Error reading emergency by ID:', error);
          res.status(500).send('Internal Server Error');
        }
      }
   
    static deleteById =async (req, res) => {
      
      let emergency = await emergencyModel.findOneAndDelete({id:req.params.id})
    res.json({ msg: "Emergency is deleted" });
    }

    static create= async (req, res) => {
      try {
          // Extract emergency data from the request body
          const newEmergencyData = req.body;
      
          // Check if the course ID already exists
          const existingEmergency = await emergencyModel.findOne({ id: newEmergencyData.id });
    
          if (existingEmergency) {
              res.send(`Emergency with ID ${newEmergencyData.id} already exists.`);
          } else {

              const result = await emergencyModel.insertMany(newEmergencyData);
    
          if (result){
            res.send('created');
          } else {
            res.send('failed');
          }
          console.log(result);
        
        }
    } catch (error) {
          console.error('Error creating new emergency:', error);
          res.status(500).send('Internal Server Error');
        }
  }

}
export default emergencyController
