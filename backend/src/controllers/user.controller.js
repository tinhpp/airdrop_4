const User = require('../models/User');
const { generateToken } = require('../utils/jwt.utils');

class UserController {
  /**
   * @dev [POST] /api/v1/users/login
   */
  login = async (req, res) => {
    try {
      const { socialId, provider } = req.body;
      if (!socialId || !provider) {
        res.statusMessage = 'Invalid information!';
        return res.sendStatus(400);
      }

      const user = await User.findOne({ socialId, provider });
      if (!user) {
        res.statusMessage = 'User does not exist!';
        return res.sendStatus(404);
      }

      const { accessToken, refreshToken } = generateToken({
        _id: user._id,
        socialId: user.socialId,
        provider: user.provider,
      });
      res.json({ user, accessToken, refreshToken });
    } catch (error) {
      console.log(error);
      res.statusMessage = 'Server internal error!';
      return res.sendStatus(500);
    }
  }

  /**
   * @dev [POST] /api/v1/users/register
   */
  register = async (req, res) => {
    try {
      const { socialId, name, provider } = req.body;
      if (!socialId || !name || !provider) {
        res.statusMessage = 'Invalid information!';
        return res.sendStatus(400);
      }

      const isUserExisted = await User.exists({ socialId });
      if (isUserExisted) {
        res.statusMessage = 'User is existed!';
        return res.sendStatus(409);
      }

      await User.create(req.body);
      return this.login(req, res);
    } catch (error) {
      console.log(error);
      res.statusMessage = 'Server internal error!';
      return res.sendStatus(500);
    }
  }
}

module.exports = new UserController();
