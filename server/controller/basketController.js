const User = require("../model/userModel");
const Package = require("../model/packageModel");

// Bu fonksiyon, kullanıcının belirli bir paketi almasını sağlar
exports.addBasket  = async (req, res) =>{

    const {userId, _id} = req.body;

    try {
        const package = await Package.findById(_id);
        if(package)
        {
            const updateUser = await User.findById(userId);
            if(!updateUser.ownedPackages.find(pkg => pkg._id == _id) && !updateUser.basket.includes(_id))
            {
                await User.updateOne({_id: userId}, { $push: { basket: _id } }, { new: true })
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

exports.deleteBasket = async(req,res) => {

    const {userId, _id } = req.body;

    try {
        const package = await Package.findById(_id);
        if(package)
        {
            const updateUser = await User.findById(userId);
            if(updateUser.basket.includes(_id))
            {
                await User.updateOne({_id: userId}, { $pull: { basket: _id } }, { new: true })
                res.status(200).json({ message: "Package successfully delete"});
            }
            else
            {
                res.status(404).json("This package is already in your basket");
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




