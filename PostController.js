import mongoose from 'mongoose';
import postModel from '../model/postModel.js';

class postController {
    static addPost =async(req,res) =>{
        try{
        const { title, content, author } = req.body;
        const post = new postModel({ title, content, author });
        await postModel.save();
        }catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

   static getPosts = async (req, res) => {
    try {
        const posts = await postModel.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }
    
    
}
export default postController