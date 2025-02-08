import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const CreateJwt  = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn: '1h' // 1 hour expiry
    });
}

export default CreateJwt;