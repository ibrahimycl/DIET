const User = require("../model/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { createToken } = require('../config/token.js')

//Kullanıcının DB ye kayıt olduğu fonksiyondur
exports.signupUser = async (req, res) => {
	const { userType, name, surname, userName, birthday, email, password } = req.body

	try {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		const user = await User.create({ userType, name, surname, birthday, email, userName, password: hash })
		const token = createToken(res, user._id)

		res.status(200).json({ email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

//Kullanıcın giriş yaptığı fonksiyondur. Token oluşturur.
exports.loginUser = async (req, res) => {
	const { email } = req.body
	try {
		const token = createToken(res, User._id)

		res.status(200).json({ email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

//Kullanıcının Çıkış yaptığı fonksiyondur. Kayıtlı olan tokenı siler.
exports.logout = async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: 'Logged out successfully' });
}




