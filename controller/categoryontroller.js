
import  asyncHandler from 'express-async-handler';
import categoryModel from '../model/categoryModel.js';
import AppError from '../utilites/AppError.js';


class categoryController{
    static addCategory = asyncHandler (async (req,res,next)=>{
        const categoryName = req.body
        const newCategory = await categoryModel.insertMany(categoryName)
        if(!categoryName){
            return next(new AppError('Category not found',404))
        }
        else{
            res.status(201).json({
                status :true ,
                message :"Added new Category" ,
                Data : newCategory
              })
              
        }
    })

    static getCategory =asyncHandler(async(req,res,next)=>{
            const category = await categoryModel.findById(req.params.id).populate('medicines','-_id -createdAt -updatedAt -__v');
            if (!category) {
              return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
          } )

    }

export default categoryController