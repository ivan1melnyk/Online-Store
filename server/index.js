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
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.get('/api/test-cloudinary', async (req, res) => {
  try {
    const cloudinary = require('cloudinary').v2;
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    });
    
    // Спробуйте отримати URL для тестового зображення
    const testUrl = cloudinary.url('sample', {
      width: 300,
      height: 300,
      crop: 'fill',
      secure: true
    });
    
    res.json({
      success: true,
      cloudinaryConfig: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key_set: !!process.env.CLOUDINARY_API_KEY,
        api_secret_set: !!process.env.CLOUDINARY_API_SECRET
      },
      testUrl: testUrl
    });
  } catch (error) {
    console.error('Cloudinary test error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
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
