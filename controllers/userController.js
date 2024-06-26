const User = require('../database/models/user.js');
const bcrypt = require('bcrypt');

export class UserController {
    static async generatePassword(password) {
        return await bcrypt.hash(password, 10);
    }
    static async registerUser(req, res) {
        const { full_name, phone_number, email, password } = req.body;
        try {
            const user = await User.create({
                full_name,
                phone_number,
                email,
                password: generatePassword(password)
            });
            console.log('User created:', user);
            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    static async editUser(req, res) {
        let { id_user, full_name, phone_number, email, password } = req.body;
        try {
            const updateFields = {
                ...(full_name && { full_name }),
                ...(phone_number && { phone_number }),
                ...(email && { email }),
                ...(password && { password: generatePassword(password) }),
            };
            console.log(updateFields, "passed values.");

            const [updatedRowsCount] = await User.update(updateFields, {
                where: { id_user }
            });

            if (updatedRows === 0) {
                return res.status(404).json({ success: false, message: 'User not found.' });
            }

            const updatedUser = await User.findByPk(id_user);

            return res.status(200).json({ success: true, data: updatedUser });
        } catch (error) {
            console.log('Error executing query:', error);
            return res.status(500).json({ success: false, message: 'An error ocurred while processing your request.' })
        }
    }
}
