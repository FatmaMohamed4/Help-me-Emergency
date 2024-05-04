import mongoose from 'mongoose';
import courseModel from '../model/courseModel.js';
import { param } from 'express-validator';
import catchError from '../utilites/catchError.js';
import AppError from '../utilites/AppError.js';


class courseController {
  static addCourse = catchError(async (req, res,next) => {
   
      const id = req.body.id;
      const course = await courseModel.findOne({ id: id });
      if (course) {
        return next(new AppError('Course is exists',409))
      } else {
        await courseModel.create(req.body);
        return res.status(201).json({ msg: "Course has been added successfully" });
      }
  })
    

  static allCourses =catchError(async(req,res,next)=>{
    let x = await courseModel.find()
    res.json({ msg:"Courses :" , x });
    if(!x){
      return next(new AppError('Courses not found',404))
    }
   })
   
  static getCourse =catchError( async (req, res,next) => {
      const courseId = req.params.id;

      const result = await courseModel.findById({ _id: courseId });
      if (result) {
        res.header('Content-Type', 'application/json');
        res.send(JSON.stringify(result, null, 2));
      } else {
        return next(new AppError('Courses not found',404))
      }
   
  }
      )
       
    
       static updateCourseById =catchError(async(req,res,next)=>{
        let course = await courseModel.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
         res.json({ msg: "Updated Course data" ,course});
         if(!course){
          return next(new AppError('Error in update Course',500))
         }
       })
       
       static deleteCourse =catchError(async(req,res,next)=>{
        let course = await courseModel.findByIdAndDelete({_id:req.params.id})
        res.json({ msg: "Course is deleted" });
      if  (!course){
          return next(new AppError('Error in delete Course',500))
        }
      })

}

    export default courseController