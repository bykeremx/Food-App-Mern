import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js'
import dotenv from 'dotenv';
dotenv.config();
//jwt auth 

const jwtAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const is_user = await UserModel.findById(id).select("-password");
    if (!is_user) {
        return res.status(403).json({ message: 'Access denied' });
    }
    req.user = is_user;
    console.log(is_user);
    next();
};


export default jwtAuth;
