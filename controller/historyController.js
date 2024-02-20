import mongoose from 'mongoose';
import historyModel from '../model/historyModel.js';

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


 }

 export default historyController