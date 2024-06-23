import express, { json } from 'express';
import { userRouter } from './routes/userRoutes.js';
import { planEntregaRouter } from './routes/planEntregaRoutes.js';
import { puntoEntregaRouter } from './routes/puntoEntregaRoutes.js';
import { productRouter } from './routes/productRoutes.js'
import { corsMiddleware } from './middlewares/cors.js';
const require = createRequire(import.meta.url);
import { createRequire } from 'module';
const path = require('path');
const app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');
import { fileURLToPath } from 'url';

/* ROUTE MANAGING */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'upload')));

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a mi server users!' });
});

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const image = req.files.image;

    if (!/^image/.test(image.mimetype)) {
        return res.status(400).send('Uploaded file is not an image.');
    }

    const uploadPath = path.join(__dirname, 'upload', image.name);

    image.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ success: true, message: 'File uploaded successfully!', data: `uploads/${image.name}` });
    });
});

app.use('/', userRouter);
app.use('/planEntrega', planEntregaRouter);
app.use('/puntoEntrega', puntoEntregaRouter);
app.use('/', productRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
});
