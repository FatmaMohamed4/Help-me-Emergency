import mongoose, { Schema, model } from 'mongoose';
const medicineSchema = new mongoose.Schema({
    medicineID: Number,
    diseaseName: String,
    medicineName: String,
    expiryDate: String,
    productionDate: String,
    patientName: String
},{
    timestamps:true
});

const medicineModel = model('medicine', medicineSchema);
export default medicineModel