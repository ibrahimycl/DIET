const express = require("express");
const { signupUser, loginUser, logout } = require("../controller/usersController");
const { validateUser } = require("../middleware/validation")

const router = express.Router();

router.post("/signup",validateUser,signupUser);
router.post("/login",loginUser);
router.get("/logout",logout);

module.exports = router;