import mongoose, { Schema, model } from 'mongoose';
const emergencySchema = new mongoose.Schema({ 
    title: { type: String, required: [true, "State is require"] },
    imgMaster: { type: String, required: [true, "Image is require"] },
    imgSteps: { type: String, required: [true, "Image is require"] },
    video: { type: String, required: [true, "Video is require"] },
    steps: {type :Array,required :[true,"Steps is require"]} ,
    phone: {type :String,required :[true,"Phone is require"]} , 
},
{timestamps :true});

const emergencyModel = model('emergency', emergencySchema);
export default emergencyModel;
