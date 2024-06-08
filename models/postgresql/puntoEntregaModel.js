import { db } from './db.js';

export class PuntoEntregaModel {
    static async getAll() {
        try {
            const result = await db`SELECT * FROM punto_entrega;`
            return result;
        } catch (error) {
            console.log('Error executing query:', error);
            throw error;
        }
    }
}