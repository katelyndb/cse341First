const express = require('express');
const router = express.Router();

// responds with the home page route (when get request is made)
router.get('/', (req, res) => {
    res.send('Nia Goodwill')
  });
  // the about route
  router.get('/about', (req, res) => {
    res.send('About Nia Goodwill')
  });

router.get('/api/course/:id', (req,res) => {
  res.send(req.params.id);
});


  module.exports = router;