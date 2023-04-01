const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('categories',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        timestamps: true
    }
);

module.exports = Category;