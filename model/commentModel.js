import mongoose, { Schema, model } from 'mongoose';


const commentSchema = new Schema (
    {
        comment: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'patient', required: true }, // Assuming 'User' is your user model
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true } // Assuming 'Post' is your post model
    },
    { timestamps: true }
);

const commentModel = model('comment',commentSchema);

export default commentModel