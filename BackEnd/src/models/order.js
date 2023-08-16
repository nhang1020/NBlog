'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // define relationship here
            Order.belongsTo(models.User, { foreignKey: 'customerId', as: 'customerData' });
            Order.belongsTo(models.AllCode, { foreignKey: 'status', targetKey: 'keyMap', as: 'statusData' });
            Order.belongsTo(models.Product, { foreignKey: 'productId', as: 'productData' });
        }
    };
    Order.init({
        customerId: DataTypes.STRING,
        sellerId: DataTypes.STRING,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        totalPrice: DataTypes.BIGINT,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};