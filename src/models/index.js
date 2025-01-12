"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const mysql2 = require("mysql2");
require("dotenv").config();

const basename = path.basename(__filename);
const db = {};

// Cấu hình Sequelize với biến môi trường
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
    dialectOptions: {
      connectTimeout: 60000, // Tăng thời gian chờ kết nối
    },
  }
);

// Kiểm tra kết nối Database
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Kết nối Database thành công!");
  })
  .catch((err) => {
    console.error("❌ Kết nối Database thất bại:", err);
  });

// Load các models tự động
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

// Gọi hàm associate nếu có
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
