const Package = require("../model/packageModel");
const User = require("../model/userModel");

// Diyetisyenin yeni bir paket oluşturduğu fonksiyon
exports.createPackage = async (req, res) => {

    const {dietitianId, name, isOnlineCall, month, price, describe} = req.body;
    var active = true;

    try {
        const newPackage = await Package.create({dietitianId, name, isOnlineCall, month, price, describe, active});
        res.status(200).json("Package Added Successfully")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Diyetisyenin bir paketi güncellediği fonksiyon
exports.updatePackage = async (req, res) => {
    const packageId = req.params.id; 
    const { dietitianId } = req.body;

    try {
        const updatedPackage = await Package.findById(packageId);
        if (updatedPackage) {
            if(dietitianId == updatedPackage.dietitianId)
            {
                await Package.updateOne({ _id: packageId }, req.body, { new: true }); 
                res.status(200).json({ message: "Package updated successfully", updatedPackage });
            }
            else
            {
                res.status(404).json("Dietitian and Package Owner do not match");
            }
            
        } else {
            res.status(404).json("Package not found");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Diyetisyenin bir paketin aktiflik durumunu değiştirdiği fonksiyon
exports.changeActiveStatus = async (req, res) =>{

    const {_id, dietitianId } = req.body;

    try {
        var package = await Package.findById(_id);
    
        if (package) {
            if(package.dietitianId == dietitianId)
            {
                const newActiveValue = !package.active; 
                await Package.updateOne({ _id: _id }, { active: newActiveValue }); 
                res.status(200).json("Package Active Changed Successfully");
            }
            else
            {
                res.status(404).json("Dietitian and Package Owner do not match");
            }
            
        } else {
            res.status(404).json("Package not found");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Diyetisyenin paketlerini görüntülediği fonksiyon
exports.GetPackages = async (req, res) => {

    const {dietitianId} = req.body;

    try {
        const listPackages = await Package.find({dietitianId:dietitianId});
        res.status(200).json(listPackages);
    } catch (error) {
        res.status(400).json({ error: error.message });
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