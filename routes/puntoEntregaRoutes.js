import { Router } from 'express';
import { PuntoEntregaController } from '../controllers/puntoEntregaController.js';
export const puntoEntregaRouter = Router();

puntoEntregaRouter.get('/', PuntoEntregaController.getAllPuntoEntrega)