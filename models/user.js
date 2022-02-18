const { DataTypes } = require("sequelize");
const db = require("../config/database");
const bcypt = require("bcryptjs");
const { PASSWORD_SAVE_FAILURE } =
  require("../utils/helper/messages").failureMessages;

const Users = db
  .define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username address already in use!",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
      primaryKey: true,
      validate: {
        is: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Phone number already in use!",
      },
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    time_of_birth: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      },
    },
    gender: {
      type: DataTypes.ENUM("female", "male", "other"),
      allowNull: false,
    },
    marital_status: {
      type: DataTypes.ENUM("married", "unmarried"),
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })
  .beforeCreate("beforeCreate", async (user) => {
    await bcypt
      .hash(user.password, 10)
      .then((encryptedPassword) => (user.password = encryptedPassword))
      .catch((err) => console.log(PASSWORD_SAVE_FAILURE, err));
    return new Promise((resolve) => resolve(null));
  });

(async () => await db.sync({ force: true }))();

module.exports = Users;
