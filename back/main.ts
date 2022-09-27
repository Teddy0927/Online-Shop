import cors from 'cors';
import express from 'express';
import { itemRoutes } from './routes/itemRoutes';
import { userRoutes } from './routes/userRoutes';
import { cartRoutes } from './routes/cartRoutes';
import { userMiddleware, uploadDir } from './util/middleware';
import './models';
import 'dotenv/config';


// Constants
// Encode body
const app = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded());


// App.XXX
app.use(cors({
    origin: [process.env.FRONTEND_URL!],
    credentials: true,
    exposedHeaders: ['TEMP-TOKEN']
}));



// Use public file
app.use(express.static('public'));
app.use('/uploads', express.static(uploadDir));

// Routes
app.use(itemRoutes);
app.use(userRoutes);
app.use(cartRoutes);




// private login jor
app.use(userMiddleware, express.static('private'))

// Use port
app.listen(8000, function () {
    console.log('Listening on port 8000')
});