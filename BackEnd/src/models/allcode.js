'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        static associate(models) {
            // define association here
            AllCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
            AllCode.hasMany(models.Post, { foreignKey: 'topic', as: 'topicData' });
            AllCode.hasMany(models.Post, { foreignKey: 'privacy', as: 'privacyData' });
            AllCode.hasMany(models.Relationship, { foreignKey: 'action', as: 'actionData' });
            AllCode.hasMany(models.Product, { foreignKey: 'category', as: 'categoryData' });
            AllCode.hasMany(models.Product, { foreignKey: 'quality', as: 'qualityData' });
            AllCode.hasMany(models.Order, { foreignKey: 'status', as: 'statusData' });
        }
    };
    AllCode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AllCode',
    });
    return AllCode;
};