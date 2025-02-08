import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

//vt 
import dbConnect  from "./config/db.js";
dotenv.config();
const app = express();
//routes 
import routes from './routes/index.js';

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