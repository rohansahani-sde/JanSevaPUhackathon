import express from 'express';
import router from './routes/authRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './database/db.js';

dotenv.config()

const app = express();
connectDB();
app.use(cors());
app.use(express.json());


app.use('/api/auth/', router);

const PORT = process.env.SERVER_PORT
app.listen(PORT, ()=>{
    console.log(`server runing on ${PORT}`);
})
