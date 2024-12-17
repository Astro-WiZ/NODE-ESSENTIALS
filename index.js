import express, { urlencoded } from 'express';

import connectMongoDb from './connection';
import userRouter from './routes/user';
import { logReqRes } from './middlewares/index';

const app = express()
const PORT = 8000;



// connections
connectMongoDb("mongodb://127.0.0.1:27017/sagardb")
.then(() => console.log('MongoDB Connected'));

// Middlewares
app.use(express.json());
app.use(urlencoded({extended:false}));
app.use(logReqRes('log.txt'));

// Routes
app.use('/api/users', userRouter)

// start server
app.listen(PORT,console.log(`Server started at http://localhost:${PORT}`))