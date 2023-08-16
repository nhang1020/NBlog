'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define relationship here
            User.belongsTo(models.AllCode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            User.hasMany(models.Post, { foreignKey: 'userId', as: 'userData' });
            User.hasMany(models.Product, { foreignKey: 'sellerId', as: 'sellerData' });
            User.hasMany(models.Order, { foreignKey: 'customerId', as: 'customerData' });
            User.hasMany(models.Comment, { foreignKey: 'userId', as: 'userComment' });

            User.hasMany(models.Notification, { foreignKey: 'userId', as: 'userNotification' });
        }
    };
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.STRING,
        birth: DataTypes.DATE,
        avatar: DataTypes.BLOB('long'),
        role: DataTypes.STRING,
        profile: DataTypes.TEXT('long'),
        token: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        facebook: DataTypes.STRING,
        twitter: DataTypes.STRING,
        youtube: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};