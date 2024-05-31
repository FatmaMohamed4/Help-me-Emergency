import medicineModel from '../model/medicineModel.js';
import AppError from '../utilites/AppError.js';
import catchError from '../utilites/catchError.js';

class medicineController {

    static getAllMedicine = catchError(async(req,res,next)=> {
      const result = await medicineModel.find()
      if(!result){
        return next(new AppError('Medicines not found',404))
      } 
      res.status(200).json({
        satuts :"true" ,
       message : result
        
      })
 } )
    

    static getOneMedicineById = catchError(async (req, res,next) => {
      const medicineID = req.params.id;
      const result = await medicineModel.findOne({ _id: medicineID });

      if (!result) {
        return next(new AppError('Medicines not found',404))
      } 
      res.statue(200).json ({
        status :true , 
        message : result
      })
   })

    static createMedicine = catchError(async (req,res,next) =>{
      const newMedicineData = req.body;
        const existingMedicine = await medicineModel.findOne({ _id: newMedicineData.id });
        if (existingMedicine) {
          return next(new AppError('Medicine already exists',409))
        } else {
           const result = await medicineModel.insertMany(newMedicineData);
           res.status(200).json ({
            status :true , 
            message : result
          })
          }
    } )
////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    static deleteMedicineById =catchError(async (req, res) => {
 
          const id = req.params.id
          const result = await medicineModel.findByIdAndDelete({ _id:id });
          res.status(200).json('medicine deleted successfully');
          if(!result){
            return next(new AppError('Medicine not found',404))
          }
          
    })
 
    static updateMedicine =catchError( async (req, res) => {

          const id = req.params.id;
          const medicine = await medicineModel.findByIdAndUpdate(id, req.body, { new: true })
          if (medicine) {
              res.statue(200).json(medicine);
          } else {
            return next(new AppError('Medicines not found',404))
          }
})

}


export default medicineController
