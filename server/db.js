const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // якщо база вимагає SSL
    },
  },
});

