const User = require("../model/userModel");
const Package = require("../model/packageModel");

// Bu fonksiyon, kullanıcının belirli bir paketi almasını sağlar
exports.addedPackage = async (req, res) =>{

    const {userId, _id} = req.body;
    const buyDate = new Date();


    try {
        const package = await Package.findById(_id);
        if(package)
        {
            const updateUser = await User.findById(userId);
            if(!updateUser.ownedPackages.find(pkg => pkg._id == _id))
            {
                const { month } = package;
                await User.updateOne({_id: userId}, { $push: { ownedPackages: {_id,month,buyDate} } }, { new: true })
                res.status(200).json({ message: "Package successfully added"});
            }
            else
            {
                res.status(404).json("This package is already taken");
            }
        }
        else
        {
            res.status(404).json("Package not found");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

