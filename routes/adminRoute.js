import express from "express"
import adminCotroller from "../controller/adminController.js";

const adminRoute = express.Router();

adminRoute.get('/api/admin/allAdmin',adminCotroller.getAllAdmins)
adminRoute.post('/api/admin/login',adminCotroller.logInAdmin)
adminRoute.post('/api/admin/register',adminCotroller.registerAdmin)

export default  adminRoute