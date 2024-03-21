const express = require("express");
const { signupUser, loginUser, logout } = require("../controller/usersController");

const router = express.Router();

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.get("/logout",logout);

module.exports = router;