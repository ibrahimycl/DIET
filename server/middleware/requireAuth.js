const jwt = require('jsonwebtoken')
const User = require('../model/users')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  
  const { token } = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth