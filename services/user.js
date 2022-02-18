const User = require("../models/user");

exports.createUserProfile = async (
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
) => {
  return User.create({
    username,
    email,
    password,
    phone_number,
    date_of_birth,
    time_of_birth,
    gender: gender.toLowerCase(),
    marital_status: marital_status.toLowerCase(),
    language,
    profile_picture,
  });
};
