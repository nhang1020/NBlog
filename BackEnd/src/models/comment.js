'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            // define relationship here
            Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'userComment' });
            Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
        }
    };
    Comment.init({
        postId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        parentComment: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};