import dotenv from 'dotenv';
import express from "express";
import colors from 'colors';
import morgan from 'morgan';

import errorResponse from './middleware/error.js';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/users', userRoutes)


app.use(errorResponse)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode, and on Port ${PORT}.`))