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

router.post('/setEncryptedKey', async (req, res) => {
  const { email, encryptedKey } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  user.encryptedKey = encryptedKey;

  try {
    await user.save();
    res.status(200).json({ message: 'Encrypted key saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
