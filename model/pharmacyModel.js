import { Schema, model } from 'mongoose';

 
const pharmacySchema = new Schema({
  id: 
  {
    // type : Number,
    // required:true,
    
  },
  name: {
    type: String ,
    // required:true,
  },
  phone: {
    type: String ,
    // required:true,
  },
  location:{
    type: String ,
    // required:true,
  },
  // patientId:{
  //   type: Schema.Types.ObjectId,
  //   ref: 'patient', required: true 
  // }
} ,
{timestamps :true}
);

const pharmacyModel = model('pharmacy', pharmacySchema);

export default pharmacyModel;
