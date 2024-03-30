const express = require("express");
const { createPackage, deletePackage, changeActiveStatus, updatePackage, GetPackages}= require("../controller/packageDietitian");
const {addedPackage} = require("../controller/packageUser");
const { authMiddleware, authDietitianMiddleware, } = require("../middleware/authMiddleware");

const router = express.Router();

//Dietitian
router.post("/create",authDietitianMiddleware, createPackage);
router.post("/update/:id",authDietitianMiddleware, updatePackage);
router.post("/changeActive",authDietitianMiddleware, changeActiveStatus);
router.get("/GetPackages",authDietitianMiddleware, GetPackages);
// router.post("/deleted",authMiddleware, deletePackage);

//User
router.post("/added",authMiddleware,addedPackage);





module.exports = router;