import catchError from '../utilites/catchError.js';
import commentModel from './../model/commentModel.js';
import  asyncHandler  from 'express-async-handler';

class CommentController {

    static createComment = asyncHandler(async (req, res, next) => {
        
            const postId  = req.params.id
            const comment =req.body.comment
            const commenter = req.user._id; 
            const newComment = await commentModel.create({ comment, author: commenter, post: postId });

            res.status(201).json(newComment);
       
    })
    

    static deleteComment = asyncHandler(async (req, res, next) => {
            const commentId = req.params.id
            const userId = req.user._id;
    
            const comment = await commentModel.findById(commentId);
    
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            if (comment.author.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'Forbidden' });
            }
    
            await commentModel.findByIdAndDelete(commentId);
    
            res.status(200).json({ message: 'Comment deleted successfully' });
       
    })

}

export default CommentController;