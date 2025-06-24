const sequelize = require("../../../db");
const { DataTypes } = require("sequelize");

const UsersModel = sequelize.define("user", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  tegId: { type: DataTypes.BIGINT, defaultValue: null },
  email: { type: DataTypes.STRING, defaultValue: null },
  sumPay: { type: DataTypes.INTEGER, defaultValue: 0 },
  isVerify: { type: DataTypes.BOOLEAN, defaultValue: false },
});
module.exports = { UsersModel };
