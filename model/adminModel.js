import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
    id :{
        type:Number, 
       
    } ,
    email : 
    {type:String, 
    
    } ,
    password :{
        type:String, 
        
    } ,
    confirmPassword :{
        type:String, 
        
    } 
  },
  {timestamps :true}
  );

  const adminModel = model('admin', adminSchema);

export default adminModel;