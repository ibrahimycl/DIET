const Package = require("../model/packageModel");

exports.createPackage = async (req, res) => {

    const {name, isOnlineCall, month, price, describe} = req.body;

    try {
        const newPackage = await Package.create({name, isOnlineCall, month, price, describe});
        res.status(200).json("Package Added Successfully")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}