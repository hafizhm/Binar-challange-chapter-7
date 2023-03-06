'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_game_biodata.init({
    ID_user:  {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    email: DataTypes.TEXT,
    country: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user_game_biodata',
  });
  return user_game_biodata;
};