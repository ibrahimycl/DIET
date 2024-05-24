const User = require("../model/userModel");
const Package = require("../model/packageModel");
const Community = require("../model/communityModel");

exports.getProfile = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    let packages = [];

    if (user.userType === 0) {
      // Normal kullanıcı
      if (user.ownedPackages) {
        packages = await Package.find({ _id: { $in: user.ownedPackages } });
      }
    } else if (user.userType === 1) {
      // Diyetisyen
      packages = await Package.find({ dietitianId: id });
    } else {
      return res.status(400).json({ message: 'Geçersiz kullanıcı tipi' });
    }

    res.status(200).json({
      name: user.name,
      surname: user.surname,
      username: user.userName,
      imagePath: user.imagePath,
      email: user.email,
      birthday: user.birthday,
      userType: user.userType,
      packages: packages
    });
  } catch (error) {
    console.error('Profil verisi alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

exports.updateProfile = async (req, res) => {
  const userId  = req.userId;
  const imagePath = req.file ? req.file.path : null;

  try {
    if (imagePath) {
      const parts = imagePath.split("\\");
      const fileName = parts[parts.length - 1];
      const updatedUser = await User.findByIdAndUpdate(userId,{ imagePath: fileName},{ new: true })
    }

    res.status(200).json({message: 'Profil başarıyla güncellendi',});
  } catch (error) {
    console.error('Profil güncellenirken hata oluştu:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};
