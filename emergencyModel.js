import { Schema, model } from 'mongoose';
const emergencySchema = new Schema({
    id:{type:Number ,required :[true,"id is require"]}  , 
    state:{type :String,required :[true,"state is require"]} ,
    image: {type :String,required :[true,"image is require"]} ,
    fisrtAidSteps: {type :Array,required :[true,"fisrtAidSteps is require"]} ,
    vedio: {type :String,required :[true,"vedio is require"]} ,
    phone: {type :String,required :[true,"phone is require"]} ,

},
{timestamps :true});

const emergencyModel = model('emergency', emergencySchema);
export default emergencyModel;
