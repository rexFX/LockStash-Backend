const router = require('express').Router();

router.post('/login', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;