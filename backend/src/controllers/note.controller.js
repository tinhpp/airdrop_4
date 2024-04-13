const Note = require('../models/Note');
class NoteController {
 
  /**
   * @dev [POST] /api/v1/notes
   */
  create = async (req, res) => {
    try {
      const { title, page } = req.body;
      if(!title || !page) {
        res.statusMessage = 'Invalid information!';
        return res.sendStatus(400);
      }

      const newNote = await Note.create(req.body);
      res.json(newNote);

    } catch (error) {
      res.sendStatus(500);
    }
  }

  /**
   * @dev [GET] /api/v1/notes/:slug
   */
  noteSlug = async (req, res) => {
    try {
      const note = await Note.findOne({ slug: req.params.slug }).populate('page');
      if(!note) {
        return res.sendStatus(404);
      }
      res.json(note);
    } catch (error) {
      res.sendStatus(500);
      
    }
  }

  /**
   * @dev [GET] /api/v1/notes/page/:pageId
   */
  notesPage = async (req, res) => {
    try {
      const notes = await Note.find({ page: req.params.pageId })
      res.json(notes);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  /**
   * @dev [PATCH] /api/v1/notes/:slug
   */
  update = async (req, res) => {
    try {
      const updatedNote = await Note.findOneAndUpdate({ slug: req.params.slug }, req.body, {
        new: true,
      });

      res.json(updatedNote);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  /**
   * @dev [DELETE] /api/v1/notes/:slug
   */
  delete = async (req, res) => {
    try {
      await Note.findOneAndDelete({ slug: req.params.slug });
      res.sendStatus(204);

    } catch (error) {
      res.sendStatus(500);
    }
  }

}

module.exports = new NoteController();