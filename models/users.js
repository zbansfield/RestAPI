'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Users extends Model {}
  Users.init({
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

  Users.associate = (models) => {
    Users.belongsTo(models.Course, { 
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      } 
    });
  };

  return Users;
};