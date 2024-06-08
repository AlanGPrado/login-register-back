import { db } from './db.js';

export class PlanEntregaModel {
    static async getAll() {
        try {
            const result = await db`SELECT * FROM plan_entrega;`;
            return result;
        } catch (error) {
            console.log('Error executing query:', error);
            throw error;
        }
    }
}
