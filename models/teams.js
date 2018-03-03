'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Teams = sequelize.define('teams', {
    // System
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // User Generated
    description: DataTypes.TEXT,
    primaryColor: DataTypes.STRING, 
    secondaryColor: DataTypes.STRING, 
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // System
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE
  }, {
    underscored: true
  });
  return Teams;
};