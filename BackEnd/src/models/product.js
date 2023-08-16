'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // define relationship here
            Product.belongsTo(models.AllCode, { foreignKey: 'category', targetKey: 'keyMap', as: 'categoryData' });
            Product.belongsTo(models.AllCode, { foreignKey: 'quality', targetKey: 'keyMap', as: 'qualityData' });
            Product.hasMany(models.Order, { foreignKey: 'productId', as: 'productData' });
            Product.hasOne(models.Gallery, { foreignKey: 'productId' });
        }
    };
    Product.init({
        productName: DataTypes.STRING,
        category: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        quality: DataTypes.STRING,
        price: DataTypes.BIGINT,
        description: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};