import  express from 'express';
import  bodyParser from 'body-parser';
import  cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import path from 'path'
import connectionToDB from './config/database.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoute from './routes/products.js'
import userRoute from './routes/user.js'
import orderRoute from './routes/orders.js'
import uploadRoute from './routes/uploadRoute.js'

const app = express();
dotenv.config();

connectionToDB();

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/upload', uploadRoute)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}


app.use(notFound)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`The server is up running in ${process.env.NODE_ENV} on port ${port}`)
});