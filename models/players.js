'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Players = sequelize.define('players', {
    // Sysem
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    team_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // autogenerated
    person_id: DataTypes.INTEGER,
    name: DataTypes.STRING,  
    jersey: DataTypes.INTEGER,
    position: DataTypes.STRING,
    
    // system
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE
  }, {
    underscored: true
  });

  return Players;
};