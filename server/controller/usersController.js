const User = require("../model/userModel.js");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt')
const validator = require('validator')

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

exports.signupUser = async (req, res) => {
	console.log(req.body);
	const {userType, name, surname, userName, birthday,  email, password } = req.body
	console.log("controller  ",name, surname, userName, birthday,  email, password );

	try {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		const user = await User.create({userType, name, surname, birthday, email, userName, password: hash })
		const token = createToken(res, user._id)
	
		res.status(200).json({ email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

exports.loginUser = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.login(email, password)

		// create a token
		const token = createToken(res, user._id)

		res.status(200).json({ email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

exports.logout = async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: 'Logged out successfully' });
}




