'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            // define relationship here
            Post.belongsTo(models.AllCode, { foreignKey: 'topic', targetKey: 'keyMap', as: 'topicData' });
            Post.belongsTo(models.AllCode, { foreignKey: 'privacy', targetKey: 'keyMap', as: 'privacyData' });
            Post.belongsTo(models.User, { foreignKey: 'userId', as: 'userData' });
            Post.hasMany(models.PostFile, { foreignKey: 'postId' });
            Post.hasMany(models.Comment, { foreignKey: 'postId' });
        }
    };
    Post.init({
        userId: DataTypes.INTEGER,
        topic: DataTypes.STRING,
        contents: DataTypes.TEXT('long'),
        theme: DataTypes.STRING,
        privacy: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};