// import express from "express"
// import patientController from "../controller/patientController.js";

// const patientRoute = express.Router();


// // Register
// patientRoute.post('/register',
// [("email")
// .notEmpty().withMessage("Email is required")
// // .isEmail().withMessage("please,Enter valid Email")
// .isLength({min:15}).withMessage("too short Email")
// .custom((value) => {
//     // Check if the email ends with "@gmail.com" or "@yahoo.com"
//     const allowedDomains = ['@gmail.com', '@yahoo.com'];
    
//     if (!allowedDomains.some(domain => value.endsWith(domain))) {
//         throw new Error('Invalid email domain. The email must end with "@gmail.com" or "@yahoo.com".');
//     }
    
//     return true;
// })
//   ],

// [check("password")
// .notEmpty().withMessage("Password is required")
// .isLength({max:25}).withMessage("too long password")
// .isLength({min:8}).withMessage("too short password")
//  ],

//  [check("gender")
// .notEmpty().withMessage("Gender is required")
// .isString().withMessage("please,Enter valid gender")
// .isLength({max:6}).withMessage("too long gender")
// .isLength({min:4}).withMessage("too short gender")
//   ],

//  [check("phone")
// .notEmpty().withMessage("Phone is required")
// .isLength({max:11}).withMessage("too long phone number , it should be consists of :11 number")
// .isLength({min:11}).withMessage("too short phone number , it should be consists of :11 number")
// .custom((value) => {
//     // يحقق من أن بداية رقم الهاتف تكون 011 أو 010 أو 012 أو 015
//     const validPrefixes = ['011', '010', '012', '015'];
//     const phonePrefix = value.substring(0, 3);
//     if (!validPrefixes.includes(phonePrefix)) {
//       throw new Error('Invalid phone number prefix, it shoud start with 010 or 012 or 011 or 015');
//  }
//  return true;
// })

//  ],

// [check("name")
// .notEmpty().withMessage("Name is required").withMessage("please,Enter valid Name")
// .isLength({min:1}).withMessage("too short Name")
// .isLength({max:45}).withMessage("too long password")
// ],
// patientController.registerPatient);


// // Log in
// patientRoute.post('/login',
// [check("email")
// .notEmpty().withMessage("Email is required")
// .isEmail().withMessage("please,Enter valid Email")
// .isLength({min:15}).withMessage("too short Email")
// ,

// check("password")
// .notEmpty().withMessage("Password is required")
// .isLength({max:10}).withMessage("too long password")
// .isLength({min:8}).withMessage("too short password")
// ],patientController.LogInPatient);

// //CRUD  ==> All , byId , update ,delete
// patientRoute.get('/api/patient/all',patientController.getAllPatient)
// patientRoute.get('/api/patient/:id',patientController.getPatientById)
// patientRoute.put('/api/patient/:id',patientController.updatePatient)
// patientRoute.delete('/api/patient/:id',patientController.deletePatient)


// export default patientRoute

import express from "express";
import { check } from "express-validator";
import patientController from "../controller/patientController.js";
import authController from "../controller/authController.js";

const patientRoute = express.Router();

// Register
patientRoute.post('/register', [
    check("email")
        .notEmpty().withMessage("Email is required")
        .isLength({ min: 15 }).withMessage("Email is too short")
        .custom((value) => {
            const allowedDomains = ['@gmail.com', '@yahoo.com'];
            const domain = value.split('@')[1];
            if (!allowedDomains.includes(`@${domain}`)) {
                throw new Error('Invalid email domain. The email must end with "@gmail.com" or "@yahoo.com".');
            }
            return true;
        }),

    check("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8, max: 25 }).withMessage("Password must be between 8 and 25 characters long"),

    check("gender")
        .notEmpty().withMessage("Gender is required")
        .isString().withMessage("Please enter a valid gender")
        .isLength({ min: 4, max: 6 }).withMessage("Gender must be between 4 and 6 characters long"),

    check("phone")
        .notEmpty().withMessage("Phone is required")
        .isLength({ min: 11, max: 11 }).withMessage("Phone number must consist of 11 digits")
        .custom((value) => {
            const validPrefixes = ['011', '010', '012', '015'];
            const phonePrefix = value.substring(0, 3);
            if (!validPrefixes.includes(phonePrefix)) {
                throw new Error('Invalid phone number prefix. It should start with 010, 011, 012, or 015');
            }
            return true;
        }),

    check("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 1, max: 45 }).withMessage("Name must be between 1 and 45 characters long")
], patientController.registerPatient);



// Log in
patientRoute.post('/login', [
    check("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter a valid email address")
        .isLength({ min: 15 }).withMessage("Email is too short"),
    check("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8, max: 10 }).withMessage("Password must be between 8 and 10 characters long")
], patientController.LogInPatient);

// CRUD ==> All, byId, update, delete
patientRoute.get('/api/patient/all',authController.auth, patientController.getAllPatient);
patientRoute.get('/api/patient/:id',authController.auth, patientController.getPatientById);
patientRoute.put('/api/patient/:id',authController.auth, patientController.updatePatient);
patientRoute.delete('/api/patient/:id',authController.auth, patientController.deletePatient);

// patientRoute.get('/api/:email',authController.auth, patientController.getPatientByEmail);
patientRoute.get('/api/:email', patientController.getPatientByEmail);
patientRoute.get('/shareProfile/:email',patientController.shareProfile)

export default patientRoute;
