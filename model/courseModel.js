import { Schema, model } from 'mongoose';

 
const courseSchema = new Schema({
  id: 
  {
    type : Number,
    required:true,
    unique:true
  } ,
  image: String,
  video:String,
  courseName: {
    type: String ,
    required :[true,'Course name is required'] ,
    minlength :[3,'Course name is too short'],
    maxlength :[25,'Course name is too long'],
  },
  evaluation:  Number,
  patientId: Number
} ,
{timestamps :true}
);

const courseModel = model('courses', courseSchema);

export default courseModel;
