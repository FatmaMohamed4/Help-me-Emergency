import express from "express"
import medicineController from './../controller/medicineController.js';


const medicineRoute = express.Router();

medicineRoute.get('/api/medicine/all',medicineController.getAllMedicine)
medicineRoute.get('/api/medicine/:id',medicineController.getOneMedicineById)

medicineRoute.post('/api/admin/medicine/create',medicineController.createMedicine)

medicineRoute.delete('/api/admin/medicine/delete/:id',medicineController.deleteMedicineById)

medicineRoute.put('/api/admin/medicine/:id',medicineController.updateMedicine)
export default medicineRoute




