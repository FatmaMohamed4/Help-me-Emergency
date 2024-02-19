import express from "express"
import courseController from '../controller/courseController.js';


const courseRoutes = express.Router();


courseRoutes.get('/api/course/all',courseController.allCourses)
courseRoutes.get('/api/course/:id ',courseController.getCourse)

courseRoutes.put('/api/admin/course/update/:id',courseController.updateCourseById)

courseRoutes.post('/api/admin/course/create',courseController.addCourse)

courseRoutes.delete('/api/admin/course/delete/:id',courseController.deleteCourse)
export default  courseRoutes
