import emergencyController from "../controller/emergencyController.js";
import express from 'express'

const emergencyRoute = express.Router();




emergencyRoute.get('/api/emergency/all',emergencyController.getAll);
emergencyRoute.get('/api/emergency/:id',emergencyController.getById);

emergencyRoute.post('/api/emergency/create',emergencyController.create)

emergencyRoute.delete('/api/emergency/:id',emergencyController.deleteById)

emergencyRoute.put('/api/emergency/:id',emergencyController.update)

export default emergencyRoute