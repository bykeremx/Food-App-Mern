import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';

//vt 
import dbConnect from "./config/db.js";
dotenv.config();
const app = express();
//routes 
import routes from './routes/index.js';

app.use(cors({
    origin: 'http://localhost:3000', // React uygulamanın URL'si
    credentials: true, // Cookies ve oturumlar için gerekli
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // İzin verilen HTTP metodları
    allowedHeaders: ['Content-Type', 'Authorization'], // İzin verilen başlıklar
}));

app.use(express.json());

//request log middlewares 
app.use((req, res, next) => {
    console.log(`🔹 🚀 ${req.method} ${req.url} | Host: ${req.hostname} | IP: ${req.ip}`.bgWhite.red.bold);
    next();
});
app.use('/api', routes);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    dbConnect();
    console.log(`🚀 http://localhost:${PORT}`.bgBlue.italic);
});