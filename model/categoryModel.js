import mongoose, { Schema, model } from 'mongoose';

const categorySchema = new Schema (
    {
      categoryName :String , 
      medicines: [{ type: Schema.Types.ObjectId, ref: 'medicine' }]
    },
    { timestamps: true }
);

const categoryModel = model('category',categorySchema);

export default categoryModel