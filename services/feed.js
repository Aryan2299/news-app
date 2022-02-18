const { Op } = require("sequelize");
const Feed = require("../models/feed");

exports.getFeed = async (offset, limit) => {
  return Feed.findAll({ offset, limit });
};

exports.addArticle = async (thumbnail, headline, category, author_name) => {
  return Feed.create({
    thumbnail,
    headline,
    category,
    author_name,
  });
};

exports.getArticle = async (articleId) => {
  return Feed.findByPk(articleId);
};

exports.searchFeed = async (limit, offset, searchString) => {
  return Feed.findAll({
    offset,
    limit,
    where: {
      [Op.or]: [
        { author_name: { [Op.like]: `%${searchString}%` } },
        { headline: { [Op.like]: `%${searchString}%` } },
        { category: { [Op.like]: `%${searchString}%` } },
      ],
    },
  });
};
