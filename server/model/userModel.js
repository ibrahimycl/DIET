const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  userType: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  imagepath: {
    type: String,
    required: false
  },
  experience: {
    type: String,
    required: false
  },
  education: {
    type: String,
    required: false
  },
  ownedPackages: {
    type: Object
  }
}, { timestamps: true });



/**
 * Kullanıcı girişini gerçekleştirir.
 * 
 * @param {string} email - Kullanıcı e-posta adresi.
 * @param {string} password - Kullanıcı şifresi.
 * @returns {object} - Giriş yapmış kullanıcı nesnesi.
 * @throws {Error} - Boş alanlar, yanlış e-posta veya şifre durumunda hata fırlatır.
 */

userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}


const User = mongoose.model('users', userSchema);
module.exports = User


