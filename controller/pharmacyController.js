import pharmacyModel from '../model/pharmacyModel.js';
import slugify from 'slugify';
import patientModel from '../model/patientModel.js';
import catchError from '../utilites/catchError.js';
import AppError from '../utilites/AppError.js';
import asyncHandler from 'express-async-handler';


class pharmacyController {
    static getAllPharmacy = asyncHandler(async (req, res, next) => {
        const data = await pharmacyModel.find()
        res.json(data);

        if (!data) {
            return next(new AppError('Pharmacy not found', 404))
        }
    });
    

    static getOnePharmacyById = catchError(async (req, res,next) => {
            const pid = req.params.id;
            const result = await pharmacyModel.findOne({ _id: pid });
    
            if (result) {
                res.header('Content-Type', 'application/json');
                res.send(JSON.stringify(result, null, 2));
            } else {
                return next(new AppError('Pharmacy not found',404))
            }
        
         })

     static getOnePharmacyByName = async (req, res,next) => {
        const name = req.params.name;
        if (!name) {
            return next(new AppError('Name parameter is required', 400));
        }

        const result = await pharmacyModel.find({ name: name }).select('-patientId');
        if (result.length > 0) {
            res.status(200).json({ status: "true", pharmacy: result });
        } else {
            return next(new AppError('Pharmacy not found', 404));
        }
     }

     static addPharmacy = async (req, res, next) => {
        try {
           
            const result = await pharmacyModel.create(req.body); // Assuming newPharmacy is an object
            if (!result) {
                return next(new AppError('Failed to add pharmacy', 500)); // Assuming you have AppError defined with appropriate status codes
            }else
            {
                res.status(201).json({ message: 'Pharmacy added successfully', data: result });
            }
        } catch (error) {
            return next(error); // Forwarding any errors to the error handler middleware
        }
    };
    

    static deletePharmacy =catchError(async (req, res, next) => {
        const id = req.params.id
          const result = await pharmacyModel.findByIdAndDelete({ _id:id });
            res.status(200).send('pharmacy deleted successfully');
            if(!result){
                return next(new AppError('Pharmacy not found',404))
            }
          })
 
    static updatePharmacy = catchError(async (req, res,next) => {
            const id = req.params.id;
            const Pharmacy = await pharmacyModel.findByIdAndUpdate(id, req.body, { new: true })
            if (Pharmacy) {
                res.status(200).json({status :"true" , message :Pharmacy});
            } else {
                return next(new AppError('Pharmacy not found',404))
            }
    }
)
    static filterPharmacy = catchError(async (req, res,next) => {
            const location = req.body.location;

            // Slugify the location
            const slug = slugify(location, {
                lower: true,   
                strict: true    
            });

            const regex = new RegExp(`^${slug}$`, 'i');
            const result = await pharmacyModel.find({ location: regex }).select({ _id: 0, id: 0, patientLocation: 0 });
    
            if (result && result.length > 0) {
                res.header('Content-Type', 'application/json');
                res.send(JSON.stringify(result, null, 2));
            } else {
                return next(new AppError('Error in location',404))
            }
    })
    
    static nearPharmacy = catchError(async (req, res,next) => {
        const id = req.params.id;
            const patient = await patientModel.findById(id);
            if (!patient) {
                return next(new AppError('patient not found',404))
            }
            if (patient.location) {
                // Find pharmacies near the patient's location
                const pharmacies = await pharmacyModel.find({ location: patient.location });
                res.json(pharmacies);
            } else {
                return next(new AppError('Error in location',404))
            }
    })
    
}


export default pharmacyController