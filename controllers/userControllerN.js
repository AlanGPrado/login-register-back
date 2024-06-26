import { UserModel } from '../models/postgresql/userModel.js';

export class UserController {
    static async registerUser(req, res) {
        try {
            await UserModel.loginUser(req.body);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.log('Error executing query:', error);
            throw error;
        } finally {
            await db.end();
            console.log('connection closed.')
        }
    }

    static async registerAdmin(req, res) {
        try {
            await UserModel.loginUser({ ...req.body, admin: true });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.log('Error executing query:', error);
            throw error;
        } finally {
            await db.end();
            console.log('connection closed.')
        }
    }


    static async loginUser(req, res) {
        await UserModel.loginUser(req, res);
    }

    static async editUser(req, res) {
        await UserModel.editUser(req, res);
    }

    static async deleteUser(req, res) {
        await UserModel.deleteUser(req, res);
    }
}
