const express = require("express");
const { CreatePost, ChangeLikes, updatePost, deletePost, getCommunity } = require("../controller/communityController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multer");

const router = express.Router();

router.post("/create", authMiddleware, upload.single('image'), CreatePost);
router.post("/changeLikes",authMiddleware, ChangeLikes);
router.post("/update",authMiddleware, updatePost);
router.post("/delete",authMiddleware, deletePost);
router.get("/",getCommunity);

module.exports = router;