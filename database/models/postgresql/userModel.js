import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { config } from '../../config/config.js';
import { db } from './db.js';

export class UserModel {
    static async registerUser(user) {
        const { fullName, admin, mobileNumber, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db`
        INSERT INTO users (fullName, admin, mobileNumber, email, password) 
        VALUES (${fullName},${admin == true}, ${mobileNumber}, ${email}, ${hashedPassword}) RETURNING *`;
        console.log('Query results:', result);
    }

    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const users = await db`SELECT * FROM users WHERE email = ${email}`;
            if (users.length === 0) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            const user = users[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' })
            }

            const token = jwt.sign({ id: user.id, email: user.email }, config.secretKey, { expiresIn: '1h' });
            const { password: _, ...userData } = user;
            return res.json({ success: true, token, userData });
        } catch (error) {
            console.log('Error executing query:', error);
            return res.status(500).json({ success: false, message: 'An error ocurred while processing your request' });
        }
    }

    static async editUser(req, res) {
        let { id_user, fullname, mobilenumber, email, password } = req.body;
        try {
            let updateFields = [
                fullname && 'fullname',
                mobilenumber && 'mobilenumber',
                email && 'email',
                password && 'password'
            ].filter(Boolean);
            if (password) {
                req.body.password = await bcrypt.hash(password, 10);
            }
            console.log(updateFields, "passed values.");
            console.log(req.body, "passed body.");
            const result = await db`UPDATE users SET ${db(req.body, updateFields)} WHERE id_user = ${id_user}`;
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.log('Error executing query:', error);
            return res.status(500).json({ success: false, message: 'An error ocurred while processing your request' });
        }
    }

    static async deleteUser(req, res) {
        let { id_user } = req.params;
        try {
            const result = await db`DELETE FROM users WHERE id_user = ${id_user}`;
            console.log(req.params, "id_user");
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.log('Error executing query:', error);
            return res.status(500).json({ success: false, message: 'An error ocurred while processing your request' });
        } finally {
            await db.end();
            console.log('connection closed.')
        }
    }
}