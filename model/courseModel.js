import mongoose, { Schema, model } from 'mongoose';

// Define the schema for the course
const courseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: [true, 'Course id is unique'],
    maxlength: [4, 'Course id is too long'],
  },
  image: String,
  video: String,
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    minlength: [3, 'Course name is too short'],
    maxlength: [25, 'Course name is too long'],
  },
  evaluation: Number,
  patientId: Number
},
{ timestamps: true } // Add timestamps for createdAt and updatedAt
);

// Create the Mongoose model using the schema
const courseModel = model('course', courseSchema);

// Export the model
export default courseModel;
