import mongoose, { Schema, model ,Mongoose} from 'mongoose';

 
const pharmacySchema = new mongoose.Schema({
  name: {
    type: String ,
    required:true,
  },
  phone: {
    type: String ,
    required:true,
    unique:true
  },
  location:{
    type: String ,
    required:true,
  }
} ,
{timestamps :true}
);

const pharmacyModel = model('pharmacy', pharmacySchema);

export default pharmacyModel;
