const router = require('express').Router();
const srp = require('secure-remote-password/server');
const User = require('../models/users');

router.post('/signup', async (req, res) => {
  const { email, salt, verifier } = req.body;
  const user = new User({
    email,
    salt,
    verifier,
  });
  try {
    await user.save();
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(409).json({ message: 'Already exists' });
  }
});

module.exports = router;
