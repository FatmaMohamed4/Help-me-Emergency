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
photoRoute.post('/api/emergency/photos/upload/:id' ,photoController.uploadEmergencyPhotos)
photoRoute.post('/api/emergency/steps/:id',photoController.uploadEmergencySTEPS)
photoRoute.get('/api/emergency/photos/:id',photoController.getPhotosEmergency)
photoRoute.delete('/api/emergency/photos/:id' ,authController.restrictTo(),photoController.deleteEmergencyPhotos)


//Diseases
photoRoute.post('/disease/upload/:id',photoController.uploadDiseasePhoto)

//Medicine 
photoRoute.post('/medicine/upload/:id' , photoController.uploadMedicinePhoto)
export default photoRoute;