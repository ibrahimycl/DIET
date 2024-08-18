const express = require("express");
const { getProfile, updateProfile, getUsers } = require("../controller/profilController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { uploadProfileImage } = require("../middleware/multer");


const router = express.Router();

router.post("/id",authMiddleware, getProfile);
router.post("/update", authMiddleware, uploadProfileImage.single('image'), updateProfile);
router.get("/getUsers",authMiddleware, getUsers);



module.exports = router;