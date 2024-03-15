// import express from "express"



// import pharmacyeController from './../controller/pharmacyController.js';


// const pharmacyRoute = express.Router();

// pharmacyRoute.get('/pharmacy/all',pharmacyeController.getAllPharmacy)
// pharmacyRoute.get('/pharmacy/:id',pharmacyeController.getOnePharmacyById)
// pharmacyRoute.get('/pharmacy/:name',pharmacyeController.getOnePharmacyByName)

// //search about location
// pharmacyRoute.get('/pharmacy',pharmacyeController.filterPharmacy)


// //near pharmacy by location 
// pharmacyRoute.get('/pharmacy/near/:id',pharmacyeController.nearPharmacy)


// pharmacyRoute.post('/pharmacy',pharmacyeController.addPharmay)
// pharmacyRoute.put('/pharmacy/:id',pharmacyeController.updatePharmacy)

// pharmacyRoute.delete('/pharmacy/:id',pharmacyeController.deletePharmacy)
// export default pharmacyRoute

import express from "express";
import pharmacyController from './../controller/pharmacyController.js';

const router = express.Router();

router.route('/pharmacy')
    .get(pharmacyController.filterPharmacy)
    .post(pharmacyController.addPharmay);

router.route('/pharmacy/:id')
    .get(pharmacyController.getOnePharmacyById)
    .put(pharmacyController.updatePharmacy)
    .delete(pharmacyController.deletePharmacy);

router.get('/pharmacy/name/:name', pharmacyController.getOnePharmacyByName);


router.get('/pharmacy/all', pharmacyController.getAllPharmacy);

router.get('/pharmacy/near/:id', pharmacyController.nearPharmacy);

export default router;
