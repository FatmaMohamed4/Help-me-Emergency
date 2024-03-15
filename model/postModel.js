import mongoose, { Schema, model } from 'mongoose';

const postSchema = new Schema ({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'patient', required: true }
},
{timestamps :true})

const postModel = model('post',postSchema);

export default postModel