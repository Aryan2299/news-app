const app = require("../index");
const request = require("supertest")(app);
const assert = require("assert");

const { describe, it } = require("mocha");
const Feed = require("../models/feed");
const database = require("../config/database");
const { DB_SYNC_SUCCESS, ADD_SEED_DATA_SUCCESS, REMOVE_SEED_DATA_SUCCESS } =
  require("../utils/helper/messages").successMessages;
const { DB_SYNC_FAILURE, ADD_SEED_DATA_FAILURE, REMOVE_SEED_DATA_FAILURE } =
  require("../utils/helper/messages").failureMessages;

describe("Test suite for feed", () => {
  before(async () => {
    const thumbnailUrl = "www.thumbnail.org/get/dyj29js";

    await database
      .sync()
      .then(() => console.log(DB_SYNC_SUCCESS))
      .catch((err) => console.log(DB_SYNC_FAILURE, err));

    await Feed.create({
      thumbnail: thumbnailUrl,
      headline: "Sample Headline 1",
      category: "category-1",
      author_name: "John Doe",
    })
      .then(() => console.log(ADD_SEED_DATA_SUCCESS))
      .catch((err) => console.log(ADD_SEED_DATA_FAILURE, err));

    await Feed.create({
      thumbnail: thumbnailUrl,
      headline: "Sample Headline 2",
      category: "category-2",
      author_name: "Bryan Singer",
    })
      .then(() => console.log(ADD_SEED_DATA_SUCCESS))
      .catch((err) => console.log(ADD_SEED_DATA_FAILURE, err));
  });

  after(
    async () =>
      await Feed.destroy({ where: { article_id: [1, 2] } })
        .then(() => console.log(REMOVE_SEED_DATA_SUCCESS))
        .catch((err) => console.log(REMOVE_SEED_DATA_FAILURE, err))
  );

  it("should fetch feed", (done) => {
    request
      .get("/feed")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body.data);
        assert.ok(res.body.data.length > 0);
        done();
      });
  });

  it("should fetch article", (done) => {
    request
      .get("/feed/article/1")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body.data);
        assert.ok(res.body.data.length > 0);
        done();
      });
  });

  it("should search for articles", (done) => {
    request
      .post("/feed/search")
      .expect(200)
      .send({ searchString: "Headline" })
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body.data);
        assert.ok(res.body.data.length > 0);
        done();
      });
  });

  it("should return status code 404 when article isn't found", (done) => {
    request.get("/feed/article/0").expect(404, done);
  });

  it("should return status code 204 when search string isn't found", (done) => {
    request
      .post("/feed/search")
      .send({ searchString: "test" })
      .expect(204, done);
  });
});
