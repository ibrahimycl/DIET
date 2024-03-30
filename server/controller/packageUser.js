const User = require("../model/userModel");
const Package = require("../model/packageModel");

// Bu fonksiyon, kullanıcının belirli bir paketi almasını sağlar
exports.addedPackage = async (req, res) =>{

    const {userId, _id} = req.body;

    try {
        const updateUser = await User.findById(userId);
        if(!updateUser.ownedPackages.includes(_id))
        {
            await User.updateOne({_id: _id}, { $push: { ownedPackages: _id } }, { new: true })
            res.status(200).json({ message: "Package successfully added"});
        }
        else
        {
            res.status(404).json("This package is already taken");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}