const User = require("../model/userModel.js");
const validator = require('validator');
const bcrypt = require('bcrypt');
console.log(bcrypt);

/* Kullanıcı Kayıt olurken gerekli doğrulamaların yapıldığı fonksiyon*/
async function validateSignup(req, res, next) {

  const {email, password, userName, birthday, userType, name, surname } = req.body;
  try {
    if (!email || !password|| !userName || userType === undefined || !name || !surname) {
      throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }
    if (!validator.isDate(birthday)) {
      throw Error('Invalid birthday format');
    }

    const exists = await User.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }

    return next();

  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
}

//Kullanıcı giriş yaparken gerekli kontrollerin yapıldığı fonksiyondur.
async function validateLogin(req, res, next) {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      throw Error('All fields must be filled');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw Error('Incorrect email');
    }
    const match = await bcrypt.compare(password, user.password);
		if (!match) {
			throw Error('Incorrect password');
		}

    return next();
    
  } catch (error) {
    console.log("sadsadasdasdasdsadas");
    return res.status(422).json({ message: error.message });
  }
}

module.exports = {
  validateSignup,
  validateLogin
};
