'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Courses extends Model {}
  Courses.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estimatedTime: {
      type: DataTypes.STRING,  
      allowNull: false,
    },
    materialsNeeded: {
        type: DataTypes.STRING,  
        allowNull: false,
    },
  }, { sequelize });

  Courses.associate = (models) => {
    Courses.hasMany(models.User, { 
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      } 
    });
  };

  return Courses;
};