import mongoose, { Schema, model } from 'mongoose';
const medicineSchema = new mongoose.Schema({
    id: Number,
    category: String,
    medicine: Array,
    
},{
    timestamps:true
});

const medicineModel = model('medicine', medicineSchema);
export default medicineModel
