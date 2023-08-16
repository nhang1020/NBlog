'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Gallery extends Model {
        static associate(models) {
            // define relationship here
            Gallery.belongsTo(models.Product, { foreignKey: 'productId' });
        }
    };
    Gallery.init({
        productId: DataTypes.INTEGER,
        folderName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Gallery',
    });
    return Gallery;
};