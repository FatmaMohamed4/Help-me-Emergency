import mongoose from 'mongoose';
import historyModel from '../model/historyModel.js';
import  QRCode  from 'qrcode';
import  asyncHandler  from 'express-async-handler';
import catchError from '../utilites/catchError.js';
import AppError from '../utilites/AppError.js';
import patientModel from '../model/patientModel.js';


class historyController {
    static createHistory =catchError(async (req,res,next) => {
        const {patientId,chronicDiseases,allergy,surgery} = req.body;
        const history = await  historyModel.insertMany(req.body) ; 
        const patient = await  patientModel.findById({_id : patientId})
        if(!patient){
            return next(new AppError('Patient not found',404)) 
        } else{
            if (!history) {
                return next(new AppError('Error in Add history',500))
            }else{
                res.status(201).json({
                    status : true ,
                    message : "created history "
                })
            }
        }
  })
   
    static getHistory = catchError(async (req, res,next) => { 
        const id = req.params.id;
        const history = await historyModel.findById(id).populate('patientId', '-password -confirmPassword -email -isAdmin -gender -location -phone');

            if (!history) {
                return next(new AppError('History not found',404))
            }
    })
    

    static updateHistory = catchError(async (req, res,next) => {
        const id = req.params.id;
        const updatedHistory = await historyModel.findByIdAndUpdate(id, req.body, { new: true }).populate('patientId','-password -confirmPassword -patientId');
        if (updatedHistory) {
            res.json(updatedHistory);
        } else {
            return next(new AppError('History not found',404))
        }

})


    static deleteHistory = catchError(async (req, res,next) => {
      
        const id = req.params.id;
        const deletedHistory = await historyModel.findByIdAndDelete(id);
        if (deletedHistory) {
            res.status(200).json({ message: 'History deleted successfully' });
        } else {
            return next(new AppError('History not found',404))
        }
    
})

static shareHistory = async (req, res, next) => {
    try {

        const { id } = req.params;
        // Validate if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid patient ID');
        }

        // Call the static method
        // const history = await historyModel.findById(id).populate('patientId', '-password -confirmPassword -email -isAdmin -gender -location -phone');

        const history = await historyModel.findOne({ patientId: id }).populate('patientId', '-_id -id -password -confirmPassword -createdAt -updatedAt -email -isAdmin -gender -location -phone -otp -otpExpires -__v');


        if (!history) {
            return res.status(404).send('History not found for the provided patient ID');
        }
        const historyString = JSON.stringify(history);
        const qrCodeBuffer = await QRCode.toBuffer(historyString);
        res.set('Content-Type', 'image/png');
        res.status(200).send(qrCodeBuffer);
      } catch (error) {
        res.status(500).send(`Error retrieving or generating QR code for history: ${error.message}`);
        console.error(error);
      }
};


}
 

 export default historyController