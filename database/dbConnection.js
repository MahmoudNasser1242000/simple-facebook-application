import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('simple Facebook application', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export const testConnection = async () => {
    try {
        await sequelize.sync({alert: false, force: false});
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}