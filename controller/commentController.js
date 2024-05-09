import commentModel from './../model/commentModel.js';


class CommentController {

    // Create a new comment
    static createComment = async (req, res, next) => {
        try {
            const postId  = req.params.id
            const comment =req.body.comment
            const commenter = req.user._id; // Assuming 'req.user' is populated with authenticated user details

            const newComment = await commentModel.create({ comment, author: commenter, post: postId });

            res.status(201).json(newComment);
        } catch (error) {
            // Handle error
            next(error); // Pass error to the error handling middleware
        }
    };

    
}

export default CommentController;