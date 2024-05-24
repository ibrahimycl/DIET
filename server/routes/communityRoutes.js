const express = require("express");
const { CreatePost, ChangeLikes, updatePost, deletePost, getCommunity } = require("../controller/communityController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { uploadCommunityImage } = require("../middleware/multer");

const router = express.Router();

router.post("/create", authMiddleware, uploadCommunityImage.single('image'), CreatePost);
router.post("/changeLikes",authMiddleware, ChangeLikes);
router.post("/update",authMiddleware, updatePost);
router.post("/delete",authMiddleware, deletePost);
router.post("/",getCommunity);

module.exports = router;