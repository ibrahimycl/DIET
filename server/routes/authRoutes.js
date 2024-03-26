const express = require("express");
const { signupUser, loginUser, logout } = require("../controller/usersController");
const { validateSignup, validateLogin } = require("../middleware/userValidation")

const router = express.Router();

router.post("/signup", validateSignup, signupUser);
router.post("/login", validateLogin, loginUser);
router.get("/logout",logout);

module.exports = router;