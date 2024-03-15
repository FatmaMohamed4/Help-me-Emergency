import express from "express";
import photoController from "../controller/photoController.js";
import authController from "../controller/authController.js";

const photoRoute = express.Router();


photoRoute.post('/profilePhoto/upload/:id',photoController.uploadPhoto)
photoRoute.get('/profilePhoto/current/:id',authController.auth,photoController.lastProfilePhoto)
photoRoute.delete('/profilePhoto/current/:id',authController.auth, photoController.deleteLastPhoto)
photoRoute.patch('/profilePhoto/update/:id',authController.auth,photoController.updateLastPhoto)


// photoRoute.get('/profilePhoto/photos/:id',photoController.getPhotos)  run correctly
export default photoRoute;