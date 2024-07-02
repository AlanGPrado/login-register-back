import express, { json } from 'express';
import { userRouter } from './routes/userRoutes.js';
import { productRouter } from './routes/productRoutes.js';
import { corsMiddleware } from './middlewares/cors.js';

import { uploadImage } from './services/uploadImage.js';
import fileUpload from 'express-fileupload';

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');
app.use(fileUpload());
app.use('/uploads', express.static('upload'));


app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a mi server users!' });
});

app.use('/', userRouter);
app.use('/', productRouter);

app.post('/upload', uploadImage);

export default app;
