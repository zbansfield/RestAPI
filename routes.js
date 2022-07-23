'use strict';

const express = require('express');
const User = require('./models').User;
const Course = require('./models').Course;

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/users', async(req, res) => {
  const users = await User.findAll()
  res.json(users);
});

// Route that creates a new user.
router.post('/users', async(req, res) => {

    await User.create(req.body);
    res.status(201).json({ "message": "Account successfully created!" });

    res.redirect('/');
});

module.exports = router;
