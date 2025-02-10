import express from 'express';
import { login ,register ,authTest} from '../controllers/authController.js';
import jwtAuth from '../middlewares/AuthMiddleware.js';
const route = express.Router();


route.post('/login',login);
route.post('/register',register);

route.get('/test',[jwtAuth],authTest);

export default route;