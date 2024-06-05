import { UserModel } from '../models/postgresql/userModel.js';

export class UserController {
    static async postUser(req, res) {
        await UserModel.postUser(req, res);
    }

    static async loginUser(req, res) {
        await UserModel.loginUser(req, res);
    }
}
