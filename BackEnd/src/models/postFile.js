'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PostFile extends Model {
        static associate(models) {
            // define relationship here
            PostFile.belongsTo(models.Product, { foreignKey: 'postId' });
        }
    };
    PostFile.init({
        postId: DataTypes.INTEGER,
        image: DataTypes.BLOB('long'),
    }, {
        sequelize,
        modelName: 'PostFile',
    });
    return PostFile;
};