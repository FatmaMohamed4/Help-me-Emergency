import express from "express"
import pharmacyeController from './../controller/pharmacyController.js';


const pharmacyRoute = express.Router();

pharmacyRoute.get('/pharmacy/all',pharmacyeController.getAllPharmacy)
pharmacyRoute.get('/pharmacy/:id',pharmacyeController.getOnePharmacyById)

pharmacyRoute.post('/pharmacy',pharmacyeController.addPharmay)

pharmacyRoute.put('/pharmacy/:id',pharmacyeController.updatePharmacy)

pharmacyRoute.delete('/pharmacy/:id',pharmacyeController.deletePharmacy)
export default pharmacyRoute