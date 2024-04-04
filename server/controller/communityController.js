const Community = require("../model/communityModel");
const User = require("../model/userModel");


exports.CreatePost = async(req, res) =>{

    try {
        await Community.create(req.body);
        res.status(200).json("Community messages create succesfully");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.ChangeLikes = async (req, res) => {
    const { _id, userId } = req.body;
    try {
        const controlId = await Community.findById(_id);
        if(controlId)
        {
            const updateOperation = await Community.findOneAndUpdate(
                { _id: _id, likedUsers: { $ne: userId } }, // Sadece userId'i içermeyen belgeleri güncelle
                { $push: { likedUsers: userId }, $inc: { like: 1 } }, // userId'i likedUsers'a ekle ve like sayısını arttır
                { new: true } // Güncellenmiş belgeyi döndür
            );
        
            if (!updateOperation) {
                // Eğer kullanıcı zaten önceden beğendi ise, beğenmeyi kaldır
                await Community.findOneAndUpdate(
                    { _id: _id, likedUsers: userId }, // userId'i içeren belgeyi bul
                    { $pull: { likedUsers: userId }, $inc: { like: -1 } }, // userId'i likedUsers'dan çıkar ve like sayısını azalt
                    { new: true } // Güncellenmiş belgeyi döndür
                );
            }
            res.status(200).json("Like has been changed");
        }
        else
        {
            res.status(400).json("Invalid Id");
        }
        

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}