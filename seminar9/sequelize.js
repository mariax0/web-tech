const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/test.db",
});

sequelize.sync({ alter: true }).then(() => {
  console.log("Objects syncronized successfully");
});
module.exports = sequelize;
