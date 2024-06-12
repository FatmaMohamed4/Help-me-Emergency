import categoryModel from '../model/categoryModel.js';
import medicineModel from '../model/medicinesModel.js';
import AppError from '../utilites/AppError.js';
import catchError from '../utilites/catchError.js';
import asyncHandler from 'express-async-handler';


class medicineController {

    static getAllMedicine = catchError(async(req,res,next)=> {
      const data = await medicineModel.find()
      res.json(data);

      if (!data) {
        return next(new AppError('Medicines not found', 404))
      }
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
        const newMedicine = await medicineModel.insertMany(req.body)
        if(!newMedicine){
          return next(new AppError('Medicine not found',404))
        } else{
          res.status(200).json({
            status: 'success',
            data:  newMedicine
      
          });
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
              res.status(200).json(medicine);
          } else {
            return next(new AppError('Medicines not found',404))
          }
})

static addMedicine_ToCategory =asyncHandler(async(req,res,next)=>{
  const { categoryId, medicineId } = req.body;
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    category.medicines.push(medicineId);

    await category.save();
    res.status(200).json(category);
})

}


export default medicineController