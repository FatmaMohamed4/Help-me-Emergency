import express from "express";
import photoController from "../controller/photoController.js";

import authController from "../controller/authController.js";

const photoRoute = express.Router();

//USER
photoRoute.post('/profilePhoto/upload/:id',authController.protect,photoController.uploadPhoto)
photoRoute.get('/profilePhoto/current/:id',authController.protect,photoController.lastProfilePhoto)
photoRoute.delete('/profilePhoto/current/:id',authController.protect, photoController.deleteLastPhoto)
photoRoute.patch('/profilePhoto/update/:id',authController.protect,photoController.updateLastPhoto)
photoRoute.get('/profilePhoto/photos/:id',authController.protect,photoController.getPhotos) 



//Emergency
photoRoute.post('/api/emergency/photos/upload/:id',authController.protect,authController.restrictTo(),photoController.uploadEmergencyPhotos)
photoRoute.get('/api/emergency/photos/:id',photoController.getPhotosEmergency)
photoRoute.delete('/api/emergency/photos/:id',authController.protect,authController.restrictTo(),photoController.deleteEmergencyPhotos)

export default photoRoute;