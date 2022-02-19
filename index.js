const express = require("express");
require("dotenv").config();

const { DB_CONNECTION_FAILURE, ADD_SEED_DATA_FAILURE } =
  require("./utils/helper/messages").failureMessages;
const { DB_CONNECTION_SUCCESS, ADD_SEED_DATA } =
  require("./utils/helper/messages").successMessages;

const { PORT } = process.env;
const port = PORT || 8080;
const db = require("./config/database.js");
const feedRoutes = require("./routes/feed");
const userRoutes = require("./routes/user");
const seedData = require("./utils/helper/seedData");

require("./models/user");
require("./models/feed");

const app = express();

app.use(express.json());

db.authenticate()
  .then(() => console.log(DB_CONNECTION_SUCCESS))
  .then(async () =>
    seedData()
      .then(() => console.log(ADD_SEED_DATA))
      .catch((err) => console.log(ADD_SEED_DATA_FAILURE, err))
  )
  .catch((err) => {
    console.log(DB_CONNECTION_FAILURE, err);
    throw err;
  });

app.use("/feed", feedRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("Server started on port", port);
});

module.exports = app;
