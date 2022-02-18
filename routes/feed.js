const express = require("express");

const router = express.Router();

const feedController = require("../controllers/feed");

router.get("/article/:id", feedController.getArticle);
router.post("/search", feedController.searchFeed);
router.get("/", feedController.getFeed);

module.exports = router;
