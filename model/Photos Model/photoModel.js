import mongoose, { Schema, model } from 'mongoose';

const photoSchema = new mongoose.Schema ({
    patientId: { 
        type: Schema.Types.ObjectId,
         ref: 'patient', required: true 
        },
     name :String,  // in postman
     photo :{
        type : String ,
        default: function() {
            return this.gender === 'female' ? 'https://images.app.goo.gl/yzzhFFH6QL35HEu59' : 'https://images.app.goo.gl/yzzhFFH6QL35HEu59';
        }
     } // photo upload in postman
},
{timestamps :true})

const photoModel = model('photo',photoSchema);

export default photoModel