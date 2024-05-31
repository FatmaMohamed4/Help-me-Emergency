import mongoose, { Schema, model } from 'mongoose';

const diseasesSchema = new mongoose.Schema({
    id: {
      type: Number,
      // required: true,
      unique: [true, 'Diseases id is unique'],
      maxlength: [4, 'Diseases id is too long'],
    },
    imgSrc: String,
    videos: Array,
    symptoms :Array ,
    treatement :Array

}
,{ timestamps: true } // Add timestamps for createdAt and updatedAt
  );
  
  // Create the Mongoose model using the schema
  const diseasesModel = model('diseases', diseasesSchema);
  
  // Export the model
  export default diseasesModel;