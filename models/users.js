'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    // The password cannot be null
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'disabled']
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE
  }, {
    underscored: true
  });
  return Users;
};