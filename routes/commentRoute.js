import express from 'express';

import authController from '../controller/authController.js';
import CommentController from '../controller/commentController.js';

const commentRoute = express.Router();


commentRoute.post('/comment/add/:id',CommentController.createComment)




export default commentRoute