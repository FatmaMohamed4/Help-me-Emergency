import mongoose from 'mongoose';
import historyModel from '../model/historyModel.js';
import  QRCode  from 'qrcode';
class historyController {
    static createHistory =async (req,res) => {
          const {patientId,chronicDiseases,allergy,surgery} = req.body;
          const history = await  historyModel.insertMany(req.body) ; 
          if (history) res.json(history)
    }
   
    static getHistory =async (req,res) => { 
        const id = req.params.id;
        try{
       const history = await historyModel.find({_id:id}).populate('patientId','-password -confirmPassword -patientId')
       res.json (history)
        }catch{
            console.error('Error reading history by id:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static updateHistory = async (req, res) => {
        try {
            const id = req.params.id;
            const updatedHistory = await historyModel.findByIdAndUpdate(id, req.body, { new: true }).populate('patientId','-password -confirmPassword -patientId');
            if (updatedHistory) {
                res.json(updatedHistory);
            } else {
                res.status(404).send('History not found');
            }
        } catch (error) {
            console.error('Error updating history:', error);
            res.status(500).send('Internal Server Error');
        }
    }


    static deleteHistory = async (req, res) => {
        try {
            const id = req.params.id;
            const deletedHistory = await historyModel.findByIdAndDelete(id);
            if (deletedHistory) {
                res.json({ message: 'History deleted successfully' });
            } else {
                res.status(404).send('History not found');
            }
        } catch (error) {
            console.error('Error deleting history:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    // //run qrcode
    static shareHistory = async (req, res) => {
        const id = req.params.id;
        try {
            const history = await historyModel.findById(id).populate('patientId', '-_id -id -password -confirmPassword -patientId');
            if (!history) {
                return res.status(404).json({ error: 'History not found' });
            }
    
            const patientData = JSON.stringify(history);
            QRCode.toDataURL(patientData, (err, qrDataUrl) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                // Send the QR code image directly to the browser
                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': qrDataUrl.length
                });
                res.end(Buffer.from(qrDataUrl.split('base64,')[1], 'base64'));
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    
 }

 export default historyController