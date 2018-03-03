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
    // user generated
    description: {
      type: DataTypes.TEXT,
      required: true
    },
    status: DataTypes.BOOLEAN,
    // nba team id info
    tricode: DataTypes.STRING, 
    ttsName: DataTypes.STRING,
    primaryColor: DataTypes.STRING,
    secondaryColor: DataTypes.STRING,
    // nba player info 
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    personId: DataTypes.INTEGER, 
    teamId: DataTypes.INTEGER,
    jersey: DataTypes.INTEGER, 
    isActive: DataTypes.BOOLEAN, 
    pos: DataTypes.STRING,
    heightFeet: DataTypes.INTEGER,
    heightInches: DataTypes.INTEGER, 
    heightMeters: DataTypes.DECIMAL, 
    weightPounds: DataTypes.INTEGER, 
    weightKilograms: DataTypes.DECIMAL, 
    dateOfBirthUTC: DataTypes.DATEONLY, 
    draftTeamId: DataTypes.INTEGER,
    pickNum: DataTypes.INTEGER,
    roundNum: DataTypes.INTEGER, 
    draftSeasonYear: DataTypes.INTEGER,
    nbaDebutYear: DataTypes.INTEGER, 
    yearsPro: DataTypes.INTEGER, 
    collegeName: DataTypes.STRING,
    lastAffiliation: DataTypes.STRING, 
    country: DataTypes.STRING, 
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