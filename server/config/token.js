const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const createToken = (res, _id) => {
	token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
		sameSite: 'strict', // Prevent CSRF attacks
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	});
	return token;
}

module.exports = {createToken};