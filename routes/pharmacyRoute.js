
import express from "express";
import pharmacyController from './../controller/pharmacyController.js';
import authController from "../controller/authController.js";

const pharmacyRoute = express.Router();

pharmacyRoute.get('/pharmacy/all',pharmacyController.getAllPharmacy)
pharmacyRoute.get('/pharmacy/:id',pharmacyController.getOnePharmacyById)
pharmacyRoute.get('/pharmacy/name/:name',pharmacyController.getOnePharmacyByName)
pharmacyRoute.get('/pharamcy/near/:id',pharmacyController.nearPharmacy) //بتاخد اللوكيشن بتاع البيشنت و تدور على اقريب ليه
pharmacyRoute.get('/pharmacy',pharmacyController.filterPharmacy) //filter depend on the city in the body 





pharmacyRoute.post('/pharmacy/addOne',pharmacyController.addPharmacy)
pharmacyRoute.delete('/pharmacy/:id', pharmacyController.deletePharmacy)
pharmacyRoute.patch('/pharmacy/:id',pharmacyController.updatePharmacy)

export default pharmacyRoute;