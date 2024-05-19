const multer = require('multer');
const path = require('path');

// Dosyaların yükleneceği klasör ve dosya adı ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/images/'); // Dosyaların yükleneceği klasör
  },
  filename: (req, file, cb) => {
    // Dosya adının benzersiz bir şekilde oluşturulması
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Dosya adı
  }
});

// Dosya yükleme sınırları
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // Maksimum 5 MB
});

module.exports = { upload };
