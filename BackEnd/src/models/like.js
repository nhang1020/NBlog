'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            // define relationship here
            Like.belongsTo(models.Product, { foreignKey: 'postId' });
            Like.belongsTo(models.User, { foreignKey: 'userId' });
        }
    };
    Like.init({
        postId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Like',
    });
    return Like;
};