const express = require('express');
const router = express.Router();
const userRoutes = require('./user.route');
const pageRoutes = require('./page.route');
const noteRoutes = require('./note.route');

const defaultRoutes = [
  {
    routes: userRoutes,
    path: '/users'
  },
  {
    routes: pageRoutes,
    path: '/pages'
  },
  {
    routes: noteRoutes,
    path: '/notes'
  }
]

defaultRoutes.forEach(item => router.use(item.path, item.routes));

module.exports = router