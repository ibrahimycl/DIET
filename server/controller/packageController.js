const Package = require("../model/packageModel");
const User = require("../model/userModel");

exports.createPackage = async (req, res) => {

    const {dietitianId, name, isOnlineCall, month, price, describe} = req.body;

    try {
        const newPackage = await Package.create({dietitianId, name, isOnlineCall, month, price, describe});
        res.status(200).json("Package Added Successfully")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// exports.deletePackage = async (req, res) => {
//     const { _id } = req.body;

//     try {
//         // Paketi sil
//         await Package.findByIdAndDelete(_id);
//         res.status(200).json("Package Deleted Successfully");
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }