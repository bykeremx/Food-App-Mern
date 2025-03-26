import express from "express";


const router = express.Router();
import {  adminIndex } from '../controllers/adminController.js';
import jwtAuth from "../middlewares/AuthMiddleware.js";
import adminAuth from "../middlewares/AdminAuth.js";

router.get('/dasboard',[jwtAuth,adminAuth],adminIndex);

export default router;
