import express from "express";
import photoController from "../controller/photoController.js";

import authController from "../controller/authController.js";

const photoRoute = express.Router();

//USER
photoRoute.post('/profilePhoto/upload/:id' ,photoController.uploadPhoto)
photoRoute.get('/profilePhoto/current/:id' ,photoController.lastProfilePhoto)
photoRoute.delete('/profilePhoto/current/:id' , photoController.deleteLastPhoto)
photoRoute.patch('/profilePhoto/update/:id' ,photoController.updateLastPhoto)
photoRoute.get('/profilePhoto/photos/:id' ,photoController.getPhotos) 



//Emergency
photoRoute.post('/api/emergency/photos/upload/:id' ,authController.restrictTo(),photoController.uploadEmergencyPhotos)
photoRoute.get('/api/emergency/photos/:id',photoController.getPhotosEmergency)
photoRoute.delete('/api/emergency/photos/:id' ,authController.restrictTo(),photoController.deleteEmergencyPhotos)

export default photoRoute;