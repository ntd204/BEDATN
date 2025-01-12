"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
import mysql2 from "mysql2";

if (config.dialect === "mysql") {
  config.dialectModule = mysql2;
  config.dialectOptions = {
    connectTimeout: 60000, // Tăng thời gian chờ kết nối lên 60 giây
  };
}

let sequelize;
if (config?.use_env_variable) {
  sequelize = new Sequelize(
    process.env.DB_NAME, // Tên database
    process.env.DB_USERNAME, // Tài khoản
    process.env.DB_PASSWORD, // Mật khẩu
    {
      host: process.env.DB_HOST, // Địa chỉ host
      dialect: "mysql", // Loại cơ sở dữ liệu
      logging: false, // Tắt log SQL (để true nếu cần debug)
    }
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
