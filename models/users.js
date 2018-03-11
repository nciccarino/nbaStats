'use strict'

var bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {  
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
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
  },  // We're saying that we want our Author to have Posts
    {
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          User.hasMany(models.teams, {
            onDelete: "cascade"
          });
        }
      }
    }

  );

  //prototype method/function for User model--comparison check between unhashed password and hashed password in mySQL DB
  Users.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
  }

  //Hook is hashing password before User is created (from Sequelize model)
  Users.hook("beforeCreate", function(user, options) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  })

  return Users;
};