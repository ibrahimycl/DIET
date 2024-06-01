const express = require("express");
const { signupUser, loginUser, logout } = require("../controller/usersController");
const { validateSignup, validateLogin } = require("../middleware/userValidation");
const { checkToken } = require("../controller/tokenController");

const router = express.Router();

router.post("/signup", validateSignup, signupUser);
router.post("/login", validateLogin, loginUser);
router.get("/logout",logout);
router.get("/checkuser",checkToken);

module.exports = router;