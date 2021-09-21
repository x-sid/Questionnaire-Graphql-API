"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    static associate(models) {
      // define association here
    }
  }
  Questionnaire.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      link: DataTypes.STRING,
      questions: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "Questionnaire",
    }
  );
  return Questionnaire;
};
