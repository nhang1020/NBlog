'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Relationship extends Model {
        static associate(models) {
            // define relationship here
            Relationship.belongsTo(models.AllCode, { foreignKey: 'action', targetKey: 'keyMap', as: 'actionData' });
        }
    };
    Relationship.init({
        performerId: DataTypes.INTEGER,
        receiverId: DataTypes.INTEGER,
        action: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Relationship',
    });
    return Relationship;
};