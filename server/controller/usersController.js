const User = require("../model/userModel.js");
const bcrypt = require('bcrypt')
const { createToken } = require('../config/token.js')


//Kullanıcının DB ye kayıt olduğu fonksiyondur
exports.signupUser = async (req, res) => {
	const { password } = req.body

	try {
		const salt = await bcrypt.genSalt(10)
		req.body.password = await bcrypt.hash(password, salt)
		const user = await User.create( req.body )

		res.status(200).json(req.body.email)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

//Kullanıcın giriş yaptığı fonksiyondur. Token oluşturur.
exports.loginUser = async (req, res) => {
	const { email } = req.body
	try {
		user = await User.findOne({email:email})
		const token = createToken(res, user._id)
		res.status(200).json({ user , token })
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




