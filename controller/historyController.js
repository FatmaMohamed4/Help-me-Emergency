import mongoose from 'mongoose';
import historyModel from '../model/historyModel.js';
import  QRCode  from 'qrcode';
import catchError from '../utilites/catchError.js';
import AppError from '../utilites/AppError.js';

class historyController {
    static createHistory =catchError(async (req,res,next) => {
        const {patientId,chronicDiseases,allergy,surgery} = req.body;
        const history = await  historyModel.insertMany(req.body) ; 
        if (!history) {
            return next(new AppError('Error in Add history',500))
        }
  })
   
    static getHistory = catchError(async (req, res,next) => { 
        const id = req.params.id;
            const history = await historyModel.findById(id).populate('patientId', '-password -confirmPassword -patientId');
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

    // //run qrcode
    static shareHistory = catchError(async (req, res,next) => {
        const id = req.params.id;
        
            const history = await historyModel.findById(id).populate('patientId', '-_id -id -password -confirmPassword -patientId');
            if (!history) {
                return next(new AppError('History not found',404))
            }
    
            const patientData = JSON.stringify(history);
            QRCode.toDataURL(patientData, (err, qrDataUrl) => {
                // Send the QR code image directly to the browser
                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': qrDataUrl.length
                });
                res.end(Buffer.from(qrDataUrl.split('base64,')[1], 'base64'));
            });
       
    }
)
    
 }

 export default historyController