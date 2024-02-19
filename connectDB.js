
import mongoose from 'mongoose';


async function connectDB() {
await  mongoose.connect('mongodb+srv://mail1project1:team123456@cluster0.kcqny2i.mongodb.net/Help_me_Emergency')
 .then(()=>{
   console.log("DB is Connected");
 }).catch((err)=>{
  console.log(err) ;
 })



}

connectDB();

export default connectDB;