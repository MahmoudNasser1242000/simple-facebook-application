import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


export const sequelize = new Sequelize(process.env.CONNECTION_URI);

export const testConnection = async () => {
    try {
        await sequelize.sync({alert: false, force: false});
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}