import { UserModel } from '../models/postgresql/userModel.js';

export class UserController {
    static async registerUser(req, res) {
        await UserModel.registerUser(req, res);
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
