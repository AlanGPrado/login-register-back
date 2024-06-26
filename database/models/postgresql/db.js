const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with your database connection details
const sequelize = new Sequelize('inventario', 'postgres', 'Dolly2244064', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;