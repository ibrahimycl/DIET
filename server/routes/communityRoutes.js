const express = require("express");
const { CreatePost, ChangeLikes, updatePost, deletePost } = require("../controller/communityController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create",authMiddleware, CreatePost);
router.post("/changeLikes",authMiddleware, ChangeLikes);
router.post("/update",authMiddleware, updatePost);
router.post("/delete",authMiddleware, deletePost);

module.exports = router;