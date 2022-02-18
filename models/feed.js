const { DataTypes } = require("sequelize");

const db = require("../config/database");
const { ADD_SEED_DATA } = require("../utils/helper/messages").successMessages;
const { ADD_SEED_DATA_FAILURE, ADD_ARTICLE_FAILURE } =
  require("../utils/helper/messages").failureMessages;

const feedService = require("../services/feed");

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

(async () => {
  await db
    .sync({ force: true })
    .then(async () => {
      await feedService
        .addArticle(
          "www.thumbnails.com/cdn/get/image/1234gh",
          "Headline Number 1",
          "category-1",
          "John Doe"
        )
        .catch((err) => console.log(ADD_ARTICLE_FAILURE, err));

      await feedService
        .addArticle(
          "www.thumbnails.com/cdn/get/image/1234gh",
          "Headline Number 2",
          "category-2",
          "Jane Doe"
        )
        .catch((err) => console.log(ADD_ARTICLE_FAILURE, err));

      feedService
        .addArticle(
          "www.thumbnails.com/cdn/get/image/1234gh",
          "Headline Number 3",
          "category-3",
          "Stephen King"
        )
        .then(() => console.log(ADD_SEED_DATA))
        .catch((err) => console.log(ADD_ARTICLE_FAILURE, err));
    })
    .catch((err) => console.log(ADD_SEED_DATA_FAILURE, err));
})();

module.exports = Feed;
