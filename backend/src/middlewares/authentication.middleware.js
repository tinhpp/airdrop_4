const { decodeToken } = require('../utils/jwt.utils');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      const token = authHeader.split(' ')[1];
      const data = decodeToken(token);
      if (!data) return res.sendStatus(401);
      req.user = data;
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  authenticateUser,
};
