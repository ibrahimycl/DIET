const multer = require('multer');
const path = require('path');

const communityStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/images/community_images/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const uploadCommunityImage = multer({
  storage: communityStorage,
  limits: { fileSize: 1024 * 1024 * 5 } 
});

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/images/profile_images/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 1024 * 1024 * 5 } // Maksimum 5 MB
});


module.exports = { uploadCommunityImage, uploadProfileImage };
