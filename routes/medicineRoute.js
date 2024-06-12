import express from "express"
import medicineController from './../controller/medicineController.js';
import authController from "../controller/authController.js";


const medicineRoute = express.Router();

medicineRoute.get('/api/medicine/all' ,medicineController.getAllMedicine)
medicineRoute.get('/api/medicine/:id' ,medicineController.getOneMedicineById)

//admins
medicineRoute.post('/medicine/addToCategory',medicineController.addMedicine_ToCategory)
medicineRoute.post('/api/admin/medicine/create' ,medicineController.createMedicine)
medicineRoute.delete('/api/admin/medicine/delete/:id' ,medicineController.deleteMedicineById)
medicineRoute.patch('/medicine/:id' ,medicineController.updateMedicine)
export default medicineRoute




