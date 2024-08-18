const express = require("express");
const { createPackage, deletePackage, changeActiveStatus, updatePackage, GetPackages, GetPackagesDietitian, GetPackagesUser, GetBasket}= require("../controller/packageController");
const { addBasket, deleteBasket } = require("../controller/basketController");
const { addPayment } = require("../controller/paymentController");
const { authMiddleware, authDietitianMiddleware, } = require("../middleware/authMiddleware");

const router = express.Router();

//Dietitian
router.get("/", GetPackages);
router.post("/create",authDietitianMiddleware, createPackage);
router.post("/update/:id",authDietitianMiddleware, updatePackage);
router.post("/changeActive",authDietitianMiddleware, changeActiveStatus);
router.post("/GetPackagesDietitian",authMiddleware, GetPackagesDietitian);
router.post("/GetPackagesUser",authMiddleware, GetPackagesUser);
// router.post("/deleted",authMiddleware, deletePackage);

//basket
router.post("/addedBasket",authMiddleware,addBasket);
router.post("/deleteBasket",authMiddleware,deleteBasket);
router.post("/GetBasket",authMiddleware, GetBasket);


//payment
router.post("/addPayment",authMiddleware,addPayment);

module.exports = router;