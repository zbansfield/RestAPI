'use strict';

const express = require('express');
const User = require('./models').User;
const Course = require('./models').Course;

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/users', async(req, res) => {
  const users = await User.findAll()
  res.status(200);
  res.json(users);
});

// Route that creates a new user.
router.post('/users', async(req, res) => {

    await User.create(req.body);
    res.status(201).json({ "message": "Account successfully created!" });

    res.redirect('/');
});

// Route that returns list of all courses
router.get('/courses', async(req, res) => {
  const courses = await Course.findAll()
  res.status(200);
  res.json(courses);
});

// Route that returns specific course including User associated with that course
router.get('/courses/:id', async(req, res) => {
  const course = await Course.findByPk(req.params.id)
  res.status(200);
  res.json(course);
});

// Route that creates new course 
router.post('/courses', async(req, res) => {

  const course = req.body;
  course.userId = 3;

  await Course.create(course);
  res.status(201).json({ "message": "Account successfully created!" });

  res.redirect(`/courses/5`);
});

module.exports = router;
