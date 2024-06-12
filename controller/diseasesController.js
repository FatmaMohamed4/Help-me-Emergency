import asyncHandler from 'express-async-handler';
import diseasesModel from '../model/diseasesModel.js';
import AppError from '../utilites/AppError.js';
import catchError from '../utilites/catchError.js';


class diseasesController {
    static getAllDiseases = asyncHandler(async (req,res,next)=>{
        const data = await diseasesModel.find()
          res.json(data);
        
         if(!data){
          return next(new AppError('Diseases not found',404))
         }
    })

 
    static getOneById = catchError(async (req, res, next) => {
        const id = req.params.id;
        const result = await diseasesModel.findOne({ _id: id });
    
        if (!result) {
            return next(new AppError('Disease not found', 404));
        } else {
            res.status(200).json({
                status: true,
                message: result
            });
        }
    });
    
  
      static createDiseases = catchError(async (req,res,next) =>{
        const newData = req.body;
          const data = await diseasesModel.findOne({ name: newData.name });
          if (data) {
            return next(new AppError('Disease already exists',409))
          } else {
             const result = await diseasesModel.insertMany(data);
             res.status(200).json ({
              status :true , 
              message : result
            })
            }
      } )
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
  
      static deleteDiseases =catchError(async (req, res) => {
   
            const id = req.params.id
            const result = await diseasesModel.findByIdAndDelete({ _id:id });
            if(!result){
                return next(new AppError('Disease not found',404))
              }else{
                res.status(200).json('Disease deleted successfully');
              }
   
           
            
      })
   
      static updateDisease = catchError(async (req, res, next) => {
        const id = req.params.id;
        const data = await diseasesModel.findByIdAndUpdate(id, req.body, { new: true });
    
        if (data) {
            res.status(200).json(data);
        } else {
            return next(new AppError('Disease not found', 404));
        }
    });
    
}

export default diseasesController