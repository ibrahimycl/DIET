const express = require("express");
const { createPackage, deletePackage }= require("../controller/packageController");
const { authMiddleware, authDietitianMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/added",authDietitianMiddleware, createPackage);
// router.post("/deleted",authMiddleware, deletePackage);



module.exports = router;