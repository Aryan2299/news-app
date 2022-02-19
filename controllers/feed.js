const feedService = require("../services/feed");
const { FEED_FETCH_FAILURE } =
  require("../utils/helper/messages").failureMessages;

exports.getFeed = (req, res) => {
  const limit = req.query.limit ? +req.query.limit : 20;
  const offset = req.query.offset ? +req.query.offset : 0;

  feedService
    .getFeed(offset, limit)
    .then((feed) => res.status(200).send({ data: feed }))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ data: [], message: FEED_FETCH_FAILURE, error: err });
    });
};

exports.getArticle = (req, res) => {
  const { id } = req.params;

  feedService
    .getArticle(+id)
    .then((article) => {
      if (article === null) {
        return new Promise((resolve, reject) => reject(null));
      }
      res.status(200).send({ data: [article] });
    })
    .catch((err) => res.status(404).send());
};

exports.searchFeed = (req, res) => {
  const { searchString } = req.body;

  const limit = req.query.limit ? +req.query.limit : 20;
  const offset = req.query.offset ? +req.query.offset : 0;

  feedService
    .searchFeed(limit, offset, searchString)
    .then((articles) => {
      if (articles.length === 0) {
        return new Promise((resolve, reject) => reject(null));
      }
      res.status(200).send({ data: [articles] });
    })
    .catch(() => res.status(204).send());
};
