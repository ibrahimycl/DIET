const express = require("express");
const { createPackage }= require("../controller/packageController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/added",authMiddleware, createPackage);

module.exports = router;