"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    static associate(models) {
      todos.belongsTo(models.users, {
        foreignKey: "userId",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  todos.init(
    {
      activity: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "todos",
    }
  );
  return todos;
};
