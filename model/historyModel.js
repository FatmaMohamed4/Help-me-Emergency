import mongoose, { Schema, model } from 'mongoose';

const historySchema = new mongoose.Schema({
  patientId: { 
    type: Schema.Types.ObjectId,
     ref: 'patient', 
     required: [true,'ID is required'] 
    },
    // patientEmail: { 
    //   type: String,
    //    ref: 'patient', required: true 
    //   },
  chronicDiseases : Array ,
  allergy :Array,
  surgery :Array
} ,
{timestamps :true});

const historyModel = model('history', historySchema);

export default historyModel