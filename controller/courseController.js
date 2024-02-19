import mongoose from 'mongoose';
import courseModel from '../model/courseModel.js';
import { param } from 'express-validator';


class courseController {
    static addCourse =async (req,res)=>{
        await courseModel.insertMany(req.body);
        res.json({msg :"Course is Added"})
    }

    static allCourses =async(req,res)=>{
        let x = await courseModel.find()
        res.json({ msg:"Courses :" , x });
       }
   
       static getCourse =async(req,res)=>{
        const id = req.params.id;
              try{
                const course = await courseModel.findOne({ _id: id })
            
                if (course) {
                  res.header('Content-Type', 'application/json');
                  res.send(course);
                } else {
                  res.status(404).send('Course is not found');
                }
              } catch (error) {
                console.error('Error reading course by id:', error);
                res.status(500).send('Internal Server Error');
              }
       }
    
       static updateCourseById =async(req,res)=>{
        let course = await courseModel.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
         res.json({ msg: "Updated Course data" ,course});
       }
       
       static deleteCourse =async(req,res)=>{
        let course = await noteModel.findByIdAndDelete({_id:req.params.id})
        res.json({ msg: "Course is deleted" });
      }

}

    export default courseController