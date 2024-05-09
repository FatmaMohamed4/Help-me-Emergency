import express from "express"
import courseController from "../controller/courseController.js";
import authController from "../controller/authController.js";



const courseRoutes = express.Router();

//user
courseRoutes.get('/api/course/all' ,courseController.allCourses)
courseRoutes.get('/api/course/:id' ,courseController.getCourse)

//Admin
courseRoutes.put('/api/admin/course/update/:id' ,authController.restrictTo(),courseController.updateCourseById)
courseRoutes.post('/api/admin/course/create' ,authController.restrictTo(),courseController.addCourse)
courseRoutes.delete('/api/admin/course/delete/:id' ,authController.restrictTo(),courseController.deleteCourse)
export default  courseRoutes
