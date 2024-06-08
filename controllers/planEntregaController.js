import { PlanEntregaModel } from "../models/postgresql/planEntregaModel.js";

export class PlanEntregaController {
    static async getAllPlanEntrega(req, res) {
        try {
            const result = await PlanEntregaModel.getAll();
            res.json({
                success: true,
                message: 'Plan entrega records fetched successfully',
                data: result
            });
        } catch (error) {
            console.error('Error fetching plan entrega:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}
