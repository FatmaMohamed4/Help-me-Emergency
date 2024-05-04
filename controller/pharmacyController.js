import pharmacyModel from '../model/pharmacyModel.js';
import slugify from 'slugify';
import patientModel from '../model/patientModel.js';
import catchError from '../utilites/catchError.js';
import AppError from '../utilites/AppError.js';

class pharmacyeController {
    
    static getAllPharmacy= catchError(async(req,res,next)=> {
        const result = await pharmacyModel.find()
        res.status(200).json({messag : "true" ,result});
        if(!result){
            return next(new AppError('Pharmacy not found',404))
        } 
})

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
        const result = await pharmacyModel.find({name:name}).select('-patientId')
            if (result) {
                res.status(200).json({status : "true" ,pharmacy:result});
            
            } else {
                return next(new AppError('Pharmacy not found',400))
            }
     }

    static addPharmay = catchError(async (req,res,next) =>{
        const newPharmacy = req.body;
         const existPharmact = await pharmacyModel.findOne({ _id: newPharmacy.id });
   
         if (existPharmact) {
           return next(new AppError('Pharmacy exists',409))
         } else {
            const result = await pharmacyModel.insertMany(newPharmacy);
            if (result){
             res.send('Added');
            }
     }
})

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


export default pharmacyeController