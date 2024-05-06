const express = require("express");
const { createPackage, deletePackage, changeActiveStatus, updatePackage, GetPackages}= require("../controller/packageDietitian");
const { addBasket, deleteBasket } = require("../controller/basketController");
const { addPayment } = require("../controller/paymentController");
const { authMiddleware, authDietitianMiddleware, } = require("../middleware/authMiddleware");

const router = express.Router();

//Dietitian
router.post("/create",authDietitianMiddleware, createPackage);
router.post("/update/:id",authDietitianMiddleware, updatePackage);
router.post("/changeActive",authDietitianMiddleware, changeActiveStatus);
router.get("/GetPackages",authDietitianMiddleware, GetPackages);
// router.post("/deleted",authMiddleware, deletePackage);

//basket
router.post("/addedBasket",authMiddleware,addBasket);
router.post("/deleteBasket",authMiddleware,deleteBasket);

//payment
router.post("/addPayment",authMiddleware,addPayment);

module.exports = router;