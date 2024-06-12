import categoryController from "../controller/categoryontroller.js";
import express from "express"
const categoryRoute = express.Router();


categoryRoute.post('/category/add',categoryController.addCategory)
categoryRoute.get('/category/:id',categoryController.getCategory)

// categoryRoute.delete('/comment/delete/:id',CommentController.deleteComment)



export default categoryRoute