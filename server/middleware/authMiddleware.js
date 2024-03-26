const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');


dotenv.config();

const authMiddleware = (req, res, next) => {
    // İstekten token'ı al
    console.log(req.cookies);
    const token = req.cookies.jwt;

    // Token var mı yok mu kontrol et
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }

    try {
        // Token'i doğrula
        const decodedToken = jwt.verify(token, process.env.SECRET);
        // Token doğrulandıysa, kullanıcı kimliğini ekleyin ve devam edin
        req.userId = decodedToken._id;
        next();
    } catch (error) {
        // Token doğrulanamadıysa veya başka bir hata varsa, uygun bir hata yanıtı gönderin
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

module.exports = { authMiddleware };