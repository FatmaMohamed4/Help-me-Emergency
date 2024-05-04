import mongoose, { Schema, model } from 'mongoose';

const photoSchema = new mongoose.Schema ({
    patientId: { 
        type: Schema.Types.ObjectId,
         ref: 'patient', required: true 
        },
     name :String,  // in postman
     photo :String   // photo upload in postman
},
{timestamps :true})

const photoModel = model('photo',photoSchema);

export default photoModel