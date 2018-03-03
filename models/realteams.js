'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Realteams = sequelize.define('realteams', {
    // System
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    player_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // Auto Generated
    teamId: DataTypes.INTEGER, 
    seasonStart: DataTypes.INTEGER,
    seasonEnd: DataTypes.INTEGER,
    // System
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE
  }, {
    underscored: true
  });
  return Realteams;
};