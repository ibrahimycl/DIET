const validator = require('validator')

/* Kullanıcı Kayır olurken gerekli doğrulamaların yapıldığı fonksiyon*/
function validateUser(req, res, next) {

  const {email, password, userName, birthday, userType, name, surname } = req.body;
  console.log("validasyon  ",email, password, userName, birthday, userType, name, surname );
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

    return next();

  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
}

module.exports = {
  validateUser
};
