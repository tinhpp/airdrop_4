const Page = require('../models/Page');
const User = require('../models/User');

class PageController {
  /**
   * @dev [POST] /api/v1/pages
   */
  create = async (req, res) => {
    const user = req.user;
    try {
      const { title } = req.body;
      if ((!title)) {
        res.statusMessage = 'Invalid information!';
        return res.sendStatus(400);
      }

      const data = {...req.body, user: user._id};

      const newPage = await Page.create(data);
      res.json(newPage.toJSON());
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

  /**
   * @dev [GET] /api/v1/pages/user/:userId
   */
  pagesUser = async (req, res) => {
    try {
      const user = req.params.userId;
      if (!user) {
        res.statusMessage = 'Invalid User id!';
        return res.sendStatus(400);
      }

      const pages = await Page.find({ user });
      res.json(pages);
    } catch (error) {
      res.sendStatus(500);
    }
  };

  /**
   * @dev [PATCH] /api/pages/:pageId
   */
  update = async (req, res) => {
    try {
      const pageId = req.params.pageId;
      if (!pageId) {
        res.statusMessage = 'Invalid Id!';
        return res.sendStatus(400);
      }

      const updatedPage = await Page.findOneAndUpdate({ _id: pageId }, req.body, {
        new: true,
      });

      res.json(updatedPage);

    } catch (error) {
      res.sendStatus(500);
    }
  };

  /**
   * [DELETE] /api/pages/:pageId
   */
  delete = async (req, res) => {
    try {
      const pageId = req.params.pageId;
      if(!pageId) {
        res.statusMessage = 'Invalid Id!';
        return res.sendStatus(400);
      }

      await Page.deleteById(pageId);
      res.sendStatus(204);

    } catch (error) {
      res.sendStatus(500);
    }
  }


}

module.exports = new PageController();
