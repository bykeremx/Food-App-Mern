import express from 'express'
import CustomerRoutes from './customerRoute.js'
import AuthRoutes from './userRoute.js'
import foodRoutes from './FoodRoute.js'
const Router = express.Router();

Router.use("/customer",CustomerRoutes);
Router.use("/user",AuthRoutes);
Router.use("/food",foodRoutes);

export default Router;