const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page.controller');
const { authenticateUser } = require('../middlewares/authentication.middleware');

router.get('/user/:userId', authenticateUser, pageController.pagesUser);
router.post('/', authenticateUser, pageController.create);
router.patch('/:pageId', authenticateUser, pageController.update);
router.delete('/:pageId', authenticateUser, pageController.delete);

module.exports = router;
