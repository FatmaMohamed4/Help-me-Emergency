import express from "express"
import medicineController from './../controller/medicineController.js';
import authController from "../controller/authController.js";



const medicineRoute = express.Router();

medicineRoute.get('/api/medicine/all' ,medicineController.getAllMedicine)
medicineRoute.get('/api/medicine/:id' ,medicineController.getOneMedicineById)


//admins
medicineRoute.post('/api/admin/medicine/create' ,authController.restrictTo(),medicineController.createMedicine)
medicineRoute.delete('/api/admin/medicine/delete/:id' ,authController.restrictTo(),medicineController.deleteMedicineById)
medicineRoute.put('/api/admin/medicine/:id' ,authController.restrictTo(),medicineController.updateMedicine)
export default medicineRoute




