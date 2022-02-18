const { DataTypes } = require("sequelize");

const db = require("../config/database");

const Feed = db
  .define("feed", {
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upload_date_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  })
  .beforeCreate("beforeCreate", async (feed) => {
    feed.upload_date_time = new Date();
    return new Promise((resolve) => resolve(null));
  });

(() => {
  db.sync({ force: true });
})();

module.exports = Feed;
