import express from "express"
import historyController from "../controller/historyController.js";


const historyRoute = express.Router();

historyRoute.post('/history/add',historyController.createHistory)
historyRoute.get('/history/:id',historyController.getHistory)

historyRoute.put('/history/:id',historyController.updateHistory)

historyRoute.delete('/history/:id',historyController.deleteHistory)
export default  historyRoute