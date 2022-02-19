const feedService = require("../../services/feed");
const userService = require("../../services/user");
const db = require("../../config/database.js");

const { ADD_ARTICLE_FAILURE, CREATE_USER_FAILURE } =
  require("./messages").failureMessages;

module.exports = async () => {
  await db.sync({ force: true }).then(async () => {
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

    await feedService
      .addArticle(
        "www.thumbnails.com/cdn/get/image/1234gh",
        "Headline Number 3",
        "category-3",
        "Stephen King"
      )
      .catch((err) => console.log(ADD_ARTICLE_FAILURE, err));

    await userService
      .createUserProfile(
        "testuser",
        "email@domain.com",
        "password",
        7982361936,
        "1986-10-11",
        "17:03",
        "female",
        "married",
        "english",
        "www.profile-pictures.com/cdn/get/image/1937dn"
      )
      .catch((err) => console.log(CREATE_USER_FAILURE, err));
  });
};
