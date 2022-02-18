exports.failureMessages = {
  prefix: "Error: ",
  DB_CONNECTION_FAILURE: createFailureMessage("Couldn't connect to database:"),
  PASSWORD_SAVE_FAILURE: createFailureMessage("Couldn't save password:"),
  FEED_FETCH_FAILURE: createFailureMessage("Couldn't fetch feed:"),
  ARTICLE_NOT_FOUND: createFailureMessage("Article not found:"),
  NO_RESULTS_FOUND: createFailureMessage("No results found."),
  CREATE_USER_FAILURE: createFailureMessage("Couldn't create user profile:"),
  DB_SYNC_FAILURE: createFailureMessage("Couldn't syn database"),
  ADD_SEED_DATA_FAILURE: "Couldn't add test seed data:",
  REMOVE_SEED_DATA_FAILURE: "Couldn't remove test seed data:",
};

exports.successMessages = {
  DB_CONNECTION_SUCCESS: "Connected to database successfully.",
  DB_SYNC_SUCCESS: "Database synced. Tables have been created.",
  ADD_SEED_DATA_SUCCESS: "Added test seed data.",
  REMOVE_SEED_DATA_SUCCESS: "Removed test seed data.",
};

function createFailureMessage(message) {
  "Error: " + message;
}
