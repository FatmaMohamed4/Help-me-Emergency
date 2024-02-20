import { Schema, model } from 'mongoose';

const patientSchema = new Schema ({
    name: {
        type: String ,
        required :[true,"name is required"] ,
        minlength :[3,"name is too short"],
        maxlengtg :[25,"name is too long"]
    },
    email: {
        type: String ,
    },
    password: {
        type: String ,
        required : true,
    },
    confirmPassword: {
        type: String ,
        required : true
    },
    gender: {
        type: String ,
        required : true
    },
    phone: {
        type: String ,
        required : true
    },
    location: {
        type: String ,
        required : true
    },
    qr: {
        type: String ,
        required : true
    }
}
,
{timestamps :true},


);
// create model 
const patientModel = model('patient',patientSchema);

export default patientModel