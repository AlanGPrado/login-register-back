import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { config } from '../../config/config.js';
import { db } from './db.js';

export class UserModel {
    static async registerUser(req, res) {
        const { fullName, mobileNumber, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db`INSERT INTO users (fullName, mobileNumber, email, password) VALUES (${fullName}, ${mobileNumber}, ${email}, ${hashedPassword}) RETURNING *`;
            console.log('Query results:', result);
            return result;
        } catch (error) {
            console.log('Error executing query:', error);
            throw error;
        } finally {
            await db.end();
            console.log('connection closed.')
        }
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
        } finally {
            await db.end();
            console.log('Connection closed.');
        }
    }
}