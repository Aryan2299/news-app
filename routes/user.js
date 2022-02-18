const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.post("/create", userController.createUserProfile);

module.exports = router;
