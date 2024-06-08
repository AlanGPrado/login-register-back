import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const postgres = require('postgres');
import { config } from '../../config/config.js';


export const db = postgres(config.database);

// (async () => {
//     try {
//         const sql = postgres(config.database);
//         await sql`SELECT 1`;
//         console.log('Connected to the PostgreSQL database.');

//         await sql.end();
//         console.log('Connection closed.');
//     } catch (error) {
//         console.error('Connection error:', error);
//     }
// })();
