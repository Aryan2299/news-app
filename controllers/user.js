const userService = require("../services/user");
const { CREATE_USER_FAILURE } =
  require("../utils/helper/messages").failureMessages;

exports.createUserProfile = (req, res) => {
  const {
    username,
    email,
    password,
    phone_number,
    date_of_birth,
    time_of_birth,
    gender,
    marital_status,
    language,
    profile_picture,
  } = req.body;

  userService
    .createUserProfile(
      username,
      email,
      password,
      phone_number,
      date_of_birth,
      time_of_birth,
      gender,
      marital_status,
      language,
      profile_picture
    )
    .then(() => res.status(200).send())
    .catch((err) =>
      res.status(422).send({ message: CREATE_USER_FAILURE, error: err })
    );
};
