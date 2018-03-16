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
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    subheading: DataTypes.STRING(60), 
    description: DataTypes.TEXT,
    primaryColor: DataTypes.STRING, 
    image: DataTypes.STRING,
    deadline: DataTypes.DATEONLY, 
    active: DataTypes.BOOLEAN, 
    // System
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE
  }, {
    underscored: true
  },
  {
    associate: function(models) {
      Teams.hasMany(models.Players, { onDelete: 'cascade' });
    }
  });
  return Teams;
};