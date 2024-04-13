const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const { authenticateUser } = require('../middlewares/authentication.middleware');

router.get('/page/:pageId', authenticateUser, noteController.notesPage);
router.get('/:slug', noteController.noteSlug);
router.post('/', authenticateUser, noteController.create);
router.patch('/:slug', authenticateUser, noteController.update);
router.delete('/:slug', authenticateUser, noteController.delete);

module.exports = router;
