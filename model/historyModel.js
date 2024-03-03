import mongoose, { Schema, model } from 'mongoose';
// const ObjectId = mongoose.Types.ObjectId ;

const historySchema = new Schema({
  patientId: { 
    type: Schema.Types.ObjectId,
     ref: 'patient', required: true 
    },
    // patientEmail: { 
    //   type: String,
    //    ref: 'patient', required: true 
    //   },
  chronicDiseases : String ,
  allergy :Array,
  surgery :Array
} ,
{timestamps :true});

const historyModel = model('history', historySchema);

export default historyModel