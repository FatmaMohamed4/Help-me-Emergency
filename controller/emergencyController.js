import mongoose from 'mongoose';
import emergencyModel from '../model/emergencyModel.js';
import catchError from '../utilites/catchError.js';
import AppError from '../utilites/AppError.js';
class emergencyController {
    static getAll= catchError(async (req, res,next) => {
      
          const emrgency = await emergencyModel.find()
          res.json(emrgency);
        
         if(!emrgency){
          return next(new AppError('Emergencies not found',404))
         }
        
      })

     static  getById= catchError(async (req, res,next) => {

      const emergencyId = req.params.id;
      const result = await emergencyModel.find({ id: emergencyId });
      if (result) {
        res.header('Content-Type', 'application/json');
        res.send(JSON.stringify(result, null, 2));
      } else {
        return next(new AppError('Error in get Emergency',500))
      }
    
  })
   
    static deleteById =catchError(async (req, res,next) => {
      
      let emergency = await emergencyModel.findOneAndDelete({id:req.params.id})
      if(!emergency){
        return next(new AppError('Error in delete Emergency',500))
      }
    })

 
    static create = catchError(async (req, res,next) => {
      const newEmergencyData = req.body;
      if (!newEmergencyData){
        return next(new AppError('Failed to create',500))
      }else{
      const result = await emergencyModel.create(newEmergencyData);
  
      res.status(201).json({
        status :true ,
        message :"Added new emergency" ,
        EmergencyData : result
      })
      }
    })


  static update = catchError(async (req, res,next) => {
   
        let emergency = await emergencyModel.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true });
        res.json({ msg: "Updated Emergency", emergency });
       if (!emergency) {
 
        return next(new AppError('Not found Emergency',404))
       }

}
)
}


export default emergencyController
