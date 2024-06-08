import express, { json } from 'express';
import { userRouter } from './routes/userRoutes.js';
import { planEntregaRouter } from './routes/planEntregaRoutes.js';
import { puntoEntregaRouter } from './routes/puntoEntregaRoutes.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered.by');

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a mi server users!' });
})

app.use('/', userRouter);
app.use('/register', userRouter);
app.use('/login', userRouter);
app.use('/planEntrega', planEntregaRouter);
app.use('/puntoEntrega', puntoEntregaRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
});
