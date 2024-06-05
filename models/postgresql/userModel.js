import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const postgres = require('postgres');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'DOLLYNINFA19999';

const config = {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Dolly2244064',
    database: 'users'
};

(async () => {
    try {
        const sql = postgres(config);
        await sql`SELECT 1`;
        console.log('Connected to the PostgreSQL database.');

        await sql.end();
        console.log('Connection closed.');
    } catch (error) {
        console.error('Connection error:', error);
    }
})();

export class UserModel {
    static async postUser(req, res) {
        const { fullName, mobileNumber, email, password } = req.body;
        const sql = postgres(config);
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await sql`INSERT INTO users (fullName, mobileNumber, email, password) VALUES (${fullName}, ${mobileNumber}, ${email}, ${hashedPassword}) RETURNING *`;
            console.log('Query results:', result);
            return result;
        } catch (error) {
            console.log('Error executing query:', error);
            throw error;
        } finally {
            await sql.end();
            console.log('connection closed.')
        }
    }

    static async loginUser(req, res) {
        const { email, password } = req.body;
        const sql = postgres(config);
        try {
            const users = await sql`SELECT * FROM users WHERE email = ${email}`;
            if (users.length === 0) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            const user = users[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' })
            }

            const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
            const { password: _, ...userData } = user;
            return res.json({ success: true, token, userData });
        } catch (error) {
            console.log('Error executing query:', error);
            return res.status(500).json({ success: false, message: 'An error ocurred while processing your request' });
        } finally {
            await sql.end();
            console.log('Connection closed.');
        }
    }
}