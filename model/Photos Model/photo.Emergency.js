import mongoose, { Schema, model } from 'mongoose';

const photoSchema = new mongoose.Schema ({
    emergencyId: { 
        type: Schema.Types.ObjectId,
         ref: 'emergency', 
         required: true 
        },
     name :String,  // in postman
     photo :String   // photo upload in postman
},
{timestamps :true})

const photoEmergency = model('photo_Emergency',photoSchema);

export default photoEmergency