
import express from "express";
import pharmacyController from './../controller/pharmacyController.js';
import authController from "../controller/authController.js";

const router = express.Router();

router.route('/pharmacy')
    .get(authController.protect,pharmacyController.filterPharmacy)
    .post(authController.protect,authController.restrictTo(),pharmacyController.addPharmay);

router.route('/pharmacy/:id')
    .get(pharmacyController.getOnePharmacyById)
    .put(authController.protect,authController.restrictTo(),pharmacyController.updatePharmacy)
    .delete(authController.protect,authController.restrictTo(), pharmacyController.deletePharmacy);

router.get('/pharmacy/name/:name',authController.protect ,pharmacyController.getOnePharmacyByName);


router.get('/pharmacy/all', authController.protect,pharmacyController.getAllPharmacy);

router.get('/pharmacy/near/:id',authController.protect ,pharmacyController.nearPharmacy);

export default router;
