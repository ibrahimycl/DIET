const express = require("express");
const { addedFood, getTodayFood, getAllFoods } = require("../controller/foodController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/addedFood", authMiddleware, addedFood);
router.get("/getTodayFood", authMiddleware, getTodayFood);
router.get("/getAllFoods",authMiddleware,getAllFoods);

module.exports = router;