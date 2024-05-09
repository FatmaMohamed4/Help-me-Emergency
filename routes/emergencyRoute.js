import emergencyController from "../controller/emergencyController.js";
import express from 'express'
import authController from "../controller/authController.js";


const emergencyRoute = express.Router();




emergencyRoute.get('/api/emergency/all' ,emergencyController.getAll);
emergencyRoute.get('/api/emergency/:id' ,emergencyController.getById);

//admins
emergencyRoute.post('/api/emergency/create' ,authController.restrictTo(),emergencyController.create)
emergencyRoute.delete('/api/emergency/:id' ,authController.restrictTo(),emergencyController.deleteById)
emergencyRoute.put('/api/emergency/:id' ,authController.restrictTo(),emergencyController.update)



export default emergencyRoute