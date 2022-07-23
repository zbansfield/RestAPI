'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,  
      allowNull: false,
    },
  }, { sequelize });

  User.associate = (models) => {
    User.belongsTo(models.Course, { 
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      } 
    });
  };

  return User;
};