import express from "express"
import historyController from "../controller/historyController.js";
import authController from "../controller/authController.js";


const historyRoute = express.Router();

historyRoute.post('/history/add' ,historyController.createHistory)
historyRoute.get('/history/:id' ,historyController.getHistory)

historyRoute.put('/history/:id' ,historyController.updateHistory)

historyRoute.delete('/history/:id' ,historyController.deleteHistory)
historyRoute.get('/shareHistory/:id' ,historyController.shareHistory)
export default  historyRoute