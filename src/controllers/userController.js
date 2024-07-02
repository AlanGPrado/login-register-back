import { sequelize } from '../db/database.js';
import { initUserModel } from '../models/userModel.js';

const User = initUserModel(sequelize);

export class UserController {

    static async registerUser(req, res) {
        try {
            const user = await User.register(req.body);
            console.log('User created:', user);
            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    static async loginUser(req, res) {
        try {
            const user = await User.login(req.body.email);
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
            const userPwd = await User.comparePasswords(req.body.password, user.dataValues.password);
            if (!userPwd) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            console.error('Error logging user:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    static async editUser(req, res) {
        try {
            console.log(updateFields, "passed values.");

            let { id_user } = req.body;
            const [updatedRowsCount] = await User.set(
                id_user,
                req.body,
            );

            if (updatedRows === 0) {
                return res.status(404).json({ success: false, message: 'User not found.' });
            }

            const updatedUser = await User.findByPk(id_user);

            return res.status(200).json({ success: true, data: updatedUser });
        } catch (error) {
            console.log('Error editing user:', error);
            return res.status(500).json({ success: false, message: 'An error ocurred while processing your request.' });
        }
    }

    static async deleteUser(req, res) {
        try {
            await User.deleteUser(req.body.id_user);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.log('Error deleting user:', error);
            return res.status(500).json({ success: false, message: 'An error ocurred while processing your request.' });
        }
    }

}