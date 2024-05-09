import mongoose from 'mongoose';
import postModel from '../model/postModel.js';
import AppError from '../utilites/AppError.js';
import commentModel from '../model/commentModel.js';

class postController {
    static createPost = async (req, res, next) => {
        try {
            const { content } = req.body;
            const authorId = req.user._id; // Get the author's ID from the authenticated user

            // Create a new post using the postModel
            const newPost = await postModel.create({ content, author: authorId});

            // Respond with the newly created post
            res.status(201).json(newPost);
        } catch (err) {
            // Log the error for troubleshooting
            console.error('Error creating post:', err);

            // Pass a more informative error message to the error handling middleware
            return next(new AppError('Failed to create post. Please try again later.', 500));
        }
    };

    static getPostsAndComments = async (req, res, next) => {
        try {
            const userId = req.user._id; // Assuming user ID is stored in req.user._id
    
            // Retrieve posts authored by the specific user and populate author field
            const posts = await postModel.find({ author: userId })
                .populate({
                    path: 'author',
                    select: '-_id -password -email -gender -phone -location -isAdmin' // Exclude specified fields from the populated author
                });
    
            // Extract post IDs from the retrieved posts
            const postIds = posts.map(post => post._id);
    
            // Retrieve comments related to the posts and populate author field
            const comments = await commentModel.find({ post: { $in: postIds } })
                .populate({
                    path: 'author',
                    select: '-_id -password -email -gender -phone -location -isAdmin ' // Exclude specified fields from the populated author
                });
    
                const postsWithComments = posts.map(post => {
                    const postComments = comments
                        .filter(comment => comment.post.equals(post._id))
                        .map(({ _id, comment, author }) => ({ // Destructure and only include necessary fields
                            _id,
                            comment,
                            author
                        }));
        
                    return {
                        content: post.content,
                        author: post.author,
                        comments: postComments
                    };
                });
            res.status(200).json(postsWithComments);
        } catch (error) {
            next(error);
        }
    };

    static deletePostWithComments = async (req, res, next) => {
        const postId = req.params.id;

        try {
            // Find the post by ID
            const post = await postModel.findById(postId);

            if (!post) {
                return next(new AppError('Post not found.', 404));
            }

            // Delete associated comments
            await commentModel.deleteMany({ post: postId });

            // Delete the post
            await postModel.findByIdAndDelete(postId);

            res.status(200).json({ message: 'Post and associated comments deleted successfully.' });
        } catch (error) {
            next(error);
        }
    };
    
   
    // static getAllPosts = async (req, res, next) => {
    //         try {
    //             // Retrieve all posts and populate the author field
    //             const posts = await postModel.find({})
    //                 .populate({
    //                     path: 'author',
    //                     select: '-_id -password -email -gender -phone -location -isAdmin'
    //                 });
        
    //             // Extract post IDs from the retrieved posts
    //             const postIds = posts.map(post => post._id);
        
    //             // Retrieve all comments related to the posts and populate the author field
    //             const comments = await commentModel.find({ post: { $in: postIds } })
    //                 .populate({
    //                     path: 'author',
    //                     select: '-_id -password -email -gender -phone -location -isAdmin'
    //                 });
        
    //             // Map posts with their respective comments
    //             const postsWithComments = posts.map(post => {
    //                 const postComments = comments
    //                     .filter(comment => comment.post.equals(post._id))
    //                     .map(({ _id, comment, author }) => ({
    //                         _id,
    //                         comment,
    //                         author
    //                     }));
        
    //                 return {
    //                     content: post.content,
    //                     author: post.author,
    //                     comments: postComments
    //                 };
    //             });
        
    //             // Send the response with the populated posts and comments
    //             res.status(200).json(postsWithComments);
    //         } catch (error) {
    //             // Handle any errors
    //             next(error);
    //         }
    //     };
    // }        
}
export default postController