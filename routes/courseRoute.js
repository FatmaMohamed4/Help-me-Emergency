import express from "express"
import courseController from "../controller/courseController.js";
import authController from "../controller/authController.js";



const courseRoutes = express.Router();

//user
courseRoutes.get('/api/course/all',authController.protect,courseController.allCourses)
courseRoutes.get('/api/course/:id',authController.protect,courseController.getCourse)

//Admin
courseRoutes.put('/api/admin/course/update/:id',authController.protect,authController.restrictTo(),courseController.updateCourseById)
courseRoutes.post('/api/admin/course/create',authController.protect,authController.restrictTo(),courseController.addCourse)
courseRoutes.delete('/api/admin/course/delete/:id',authController.protect,authController.restrictTo(),courseController.deleteCourse)
export default  courseRoutes
