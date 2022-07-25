'use strict';

const express = require('express');
const User = require('./models').User;
const Course = require('./models').Course;
const { authenticateUser } = require('./authentication');

// Construct a router instance.
const router = express.Router();

// Handler function for each route.
// From treehouse "REST APIs with Express" Course 
function asyncHandler(cb){
  return async (req, res, next)=>{
    try {
      await cb(req,res, next);
    } catch(err){
      next(err);
    }
  };
}

// Route that returns the current authenticated user.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  
  res.json(user);
}));

// Route that creates a new user.
router.post('/users', asyncHandler(async(req, res) => {

  await User.create(req.body);
  res.status(201).json({ "message": "Account successfully created!" });

  res.redirect('/');
}));

// Route that creates a new user.
router.post('/users/:id', asyncHandler(async(req, res) => {
  const user = await User.findByPk(req.params.id)

  await user.update(req.body);
  res.status(201).json({ "message": "Account successfully updated!" });

  res.redirect('/');
}));

// Route that returns list of all courses
router.get('/courses', asyncHandler(async(req, res) => {
  const courses = await Course.findAll()
  res.status(200);
  res.json(courses);
}));

// Route that returns specific course including User associated with that course
router.get('/courses/:id', asyncHandler(async(req, res) => {
  const course = await Course.findByPk(req.params.id)
  console.log(course)
  res.status(200);
  res.json(course);
}));

// Route that creates new course 
router.post('/courses', asyncHandler(async(req, res) => {

  const course = req.body;
  course.userId = 3;
  console.log(req.body)

  // await Course.create(course);
  // res.status(201).json({ "message": "Account successfully created!" });

  res.redirect(`/courses/5`);
}));

module.exports = router;
