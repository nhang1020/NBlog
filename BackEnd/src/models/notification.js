'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            // define relationship here
            Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'userNotification' });
        }
    };
    Notification.init({
        ownerId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        contentVi: DataTypes.TEXT,
        contentEn: DataTypes.TEXT,
        seen: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Notification',
    });
    return Notification;
};