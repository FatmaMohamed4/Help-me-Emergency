import express from 'express';
import postController from '../controller/PostController.js';

const postRoute = express.Router();


postRoute.get('/posts',postController.getPosts)
postRoute.post('/post',postController.addPost)



export default postRoute