const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../model/userModel');

dotenv.config();

// Bu middleware, isteği doğrular ve kullanıcının oturum açmış olup olmadığını kontrol eder.
const authMiddleware = (req, res, next) => {
    var token = req.cookies.jwt;
    token = (!token) ?req.headers.authorization.split(' ')[1]:token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.userId = decodedToken._id; // req.body yerine req üzerine ekleyin
        req.body.userId = decodedToken._id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

// Bu middleware, isteği doğrular ve kullanıcının bir diyetisyen olup olmadığını kontrol eder.
const authDietitianMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        
        const userId = decodedToken._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - User not found' });
        }

        if (user.userType !== 1) { 
            return res.status(403).json({ error: 'Forbidden - User is not a dietitian' });
        }

        req.body.dietitianId = userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

module.exports = { authMiddleware, authDietitianMiddleware };