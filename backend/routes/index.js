import express from 'express';
import CustomerRoutes from './customerRoute.js';
import AuthRoutes from './userRoute.js'
const Router = express.Router();

Router.use("/customer",CustomerRoutes);
Router.use("/user",AuthRoutes);

export default Router;