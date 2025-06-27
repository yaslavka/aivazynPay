const sequelize = require("../../../db");
const { DataTypes } = require("sequelize");
const { UsersModel } = require("../UsersModel");

const HistoryModel = sequelize.define("history", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  amount: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.BIGINT, defaultValue: null },
});
UsersModel.hasMany(HistoryModel, { as: "history" });
HistoryModel.belongsTo(UsersModel, { as: "user" });
module.exports = { HistoryModel };
