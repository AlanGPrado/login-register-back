import { PuntoEntregaModel } from "../models/postgresql/puntoEntregaModel.js";

export class PuntoEntregaController {
    static async getAllPuntoEntrega(req, res) {
        try {
            const result = await PuntoEntregaModel.getAll();
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