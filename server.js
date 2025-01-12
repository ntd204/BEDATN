import express from "express";
// import dotenv from "dotenv";
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routes/index.js";
// import connectDatabase from "./src/config/connectDatabase.js";

// dotenv.config();
process.env.TZ = "Asia/Ho_Chi_Minh";
const app = express();
app.get("/", (req, res) => {
  res.json({ message: "Ok" });
});
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["POST", "GET", "PUT", "DELETE"],
//   })
// );
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

initRoutes(app);
// connectDatabase();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
// app.get("/api/connectDatabase", async (req, res) => {
//   try {
//     await connectDatabase();
//     res.status(200).json({ message: "Database connected successfully!" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Database connection failed!", details: error.message });
//   }
// });
