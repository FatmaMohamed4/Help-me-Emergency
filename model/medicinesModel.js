import mongoose, { Schema, model } from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: String ,
    img :String ,

    
  }, {
    timestamps: true
  });

  
const medicineModel = model('medicine', medicineSchema);

export default medicineModel