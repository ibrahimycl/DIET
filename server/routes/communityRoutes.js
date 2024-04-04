const express = require("express");
const { CreatePost, ChangeLikes } = require("../controller/communityController");
const { authMiddleware } = require("../middleware/authMiddleware");



const router = express.Router();

router.post("/create",authMiddleware, CreatePost);
router.post("/changeLikes",authMiddleware, ChangeLikes);


module.exports = router;