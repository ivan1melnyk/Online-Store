require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.SERVER_PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(cors({ origin: "*" }));
app.use(fileUpload({}));
app.use("/api", router);
//Handling Errors
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
