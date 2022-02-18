const app = require("../index");
const request = require("supertest")(app);
const assert = require("assert");

const { describe, it } = require("mocha");
const User = require("../models/user");
const { DB_SYNC_SUCCESS, REMOVE_SEED_DATA_SUCCESS } =
  require("../utils/helper/messages").successMessages;
const { DB_SYNC_FAILURE, REMOVE_SEED_DATA_FAILURE } =
  require("../utils/helper/messages").failureMessages;
const database = require("../config/database");

describe("Test suite for user", () => {
  before(
    async () =>
      await database
        .sync()
        .then(() => console.log(DB_SYNC_SUCCESS))
        .catch((err) => console.log(DB_SYNC_FAILURE, err))
  );

  after(
    async () =>
      await User.destroy({ where: { username: "username" } })
        .then(() => console.log(REMOVE_SEED_DATA_SUCCESS))
        .catch((err) => console.log(REMOVE_SEED_DATA_FAILURE, err))
  );

  it("should create user profile", (done) => {
    request
      .post("/users/create")
      .send({
        username: "username",
        email: "test@example.com",
        password: "secret-password",
        phone_number: 123456789,
        date_of_birth: Date.parse("1999-03-02"),
        time_of_birth: "01:02",
        gender: "male",
        marital_status: "unmarried",
        language: "english",
        profile_picture: "www.myprofilepicture.com/image/111111",
      })
      .expect(200, done);
  });

  it("should not create user when user already exists", (done) => {
    request
      .post("/users/create")
      .send({
        username: "username",
        email: "test@example.com",
        password: "secret-password",
        phone_number: 223456789,
        date_of_birth: Date.parse("1999-03-02"),
        time_of_birth: "23:59",
        gender: "male",
        marital_status: "unmarried",
        language: "english",
        profile_picture: "www.myprofilepicture.com/image/111111",
      })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err);

        const errorType = res.body.error.errors[0].type;

        assert.equal(errorType.trim(), "unique violation");
        done();
      });
  });

  it("should not create user when email is invalid", (done) => {
    request
      .post("/users/create")
      .send({
        username: "username",
        email: "example.com",
        password: "secret-password",
        phone_number: 323456789,
        date_of_birth: Date.parse("1999-03-02"),
        time_of_birth: "23:59",
        gender: "male",
        marital_status: "unmarried",
        language: "english",
        profile_picture: "www.myprofilepicture.com/image/111111",
      })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err);

        const errorType = res.body.error.errors[0].type;
        const errorOnField = res.body.error.errors[0].path;

        assert.equal(errorType.trim(), "Validation error");
        assert.equal(errorOnField.trim(), "email");

        done();
      });
  });
});
