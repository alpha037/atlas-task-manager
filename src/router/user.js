const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require('../emails/account');
const sharp = require('sharp');
const multer = require('multer');

// Setup Express Router
const router = new express.Router();

// REST API route -> signup users
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// REST API route -> user profile
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// REST API route -> login user
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// REST API route -> logout user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

// REST API route -> logout all user sessions
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// REST API route -> update your profile
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'email', 'password'];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) return res.status(400).send({ error: 'Invalid Updates' });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// REST API route -> delete your profile
router.delete('/users/me', auth, async (req, res) => {
  try {
    sendCancellationEmail(req.user.email, req.user.name);
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error('Please upload a JPG / JPEG or a PNG file.'));

    cb(undefined, true);
  },
});

// REST API route -> upload profile picture
router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const imageBuffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = imageBuffer;

    await req.user.save();

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// REST API route -> view the uploaded profile picture
router.get('/users/:id/avatar/', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) throw new Error();

    res.set('Content-type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

// REST API route -> delete profile picture
router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    if (req.user.avatar) {
      req.user.avatar = undefined;
      await req.user.save();
    }

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
