// Create postman collection
// Dockerise the app
// Create video
// Remove comments
// Mention author_name assumption while submitting (no reply for query)

const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.post("/create", userController.createUserProfile);

module.exports = router;
