import express from "express"
import diseasesController from "../controller/diseasesController.js";
const diseasesRoute = express.Router();

diseasesRoute.get('/api/diseases/all' ,diseasesController.getAllDiseases)
diseasesRoute.get('/api/diseases/:id',diseasesController.getOneById)
diseasesRoute.post('/api/diseases/add',diseasesController.createDiseases)
diseasesRoute.patch('/api/diseases/:id',diseasesController.updateDisease)
diseasesRoute.delete('/api/diseases/:id',diseasesController.deleteDiseases)

export default  diseasesRoute