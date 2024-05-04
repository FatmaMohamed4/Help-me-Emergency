import express from "express"
import historyController from "../controller/historyController.js";
import authController from "../controller/authController.js";


const historyRoute = express.Router();

historyRoute.post('/history/add',authController.protect,historyController.createHistory)
historyRoute.get('/history/:id',authController.protect,historyController.getHistory)

historyRoute.put('/history/:id',authController.protect,historyController.updateHistory)

historyRoute.delete('/history/:id',authController.protect,historyController.deleteHistory)
historyRoute.get('/shareHistory/:id',authController.protect,historyController.shareHistory)
export default  historyRoute