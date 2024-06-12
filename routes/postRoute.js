import express from 'express';
import postController from '../controller/PostController.js';
import authController from '../controller/authController.js';

const postRoute = express.Router();


postRoute.get('/post' ,postController.getPostsAndComments)

postRoute.post('/post/create' ,postController.createPost)
postRoute.delete('/post/delete/:id' ,postController.deletePostWithComments)




export default postRoute