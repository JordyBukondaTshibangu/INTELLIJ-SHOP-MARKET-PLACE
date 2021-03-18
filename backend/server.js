import  express from 'express';
import  'colors'
import  bodyParser from 'body-parser';
import  cors from 'cors';
import dotenv from 'dotenv'
import connectionToDB from './config/database.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoute from './routes/products.js'
import userRoute from './routes/user.js'
import orderRoute from './routes/orders.js'

const app = express();
dotenv.config();

connectionToDB();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use(notFound)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`The server is up running in ${process.env.NODE_ENV} on port ${port}`.bgBlue.bold)
});