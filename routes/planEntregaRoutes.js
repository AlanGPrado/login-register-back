import { Router } from 'express';
import { PlanEntregaController } from '../controllers/planEntregaController.js';
export const planEntregaRouter = Router();

planEntregaRouter.get('/', PlanEntregaController.getAllPlanEntrega);