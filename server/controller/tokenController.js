const User = require("../model/userModel");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.checkToken = async (req,res) => {
    var token = req.cookies.jwt || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const userId = decodedToken._id;
        const user = await User.findById(userId);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

}