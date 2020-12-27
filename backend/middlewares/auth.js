const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No token found!',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtToken);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({
      msg: 'Unauthorized Access, Token is invalid!',
    });
  }
};
