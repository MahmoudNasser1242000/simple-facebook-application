import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


export const sequelize = new Sequelize("mysql://umcndnbwwie1nepy:x1xKCJJNNJh4BqjTBYqr@b0ysgn9epjp7pigurxsy-mysql.services.clever-cloud.com:3306/b0ysgn9epjp7pigurxsy");

export const testConnection = async () => {
    try {
        await sequelize.sync({alert: false, force: false});
        // console.log('Connection has been established successfully.');
    } catch (error) {
        // console.error('Unable to connect to the database:', error);
    }
}