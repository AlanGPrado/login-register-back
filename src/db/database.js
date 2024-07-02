import 'dotenv/config'
import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "postgres",
    }
);

export default sequelize;
