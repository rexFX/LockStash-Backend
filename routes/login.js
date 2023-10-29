const router = require('express').Router();
const srp = require('secure-remote-password/server');
const User = require('../models/users');

router.post('/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const serverEphemeral = srp.generateEphemeral(user.verifier);
  user.tempEphemeral = serverEphemeral.secret;
  await user.save();

  res.status(200).json({
    salt: user.salt,
    serverEphemeral: serverEphemeral.public,
  });
});

router.post('/loginWithProof', async (req, res) => {
  const { email, clientEphemeral, clientProof } = req.body;
  const { tempEphemeral, salt, verifier } = await User.findOne({ email });

  try {
    const serverSession = srp.deriveSession(tempEphemeral, clientEphemeral, salt, email, verifier, clientProof);
    console.log(serverSession.key);
    console.log(serverSession.proof);

    res.status(200).json({ serverProof: serverSession.proof });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
