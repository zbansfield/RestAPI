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

  try {
    await User.create(req.body);
    res.status(201).json({ "message": "Account successfully created!" });
    res.redirect('/');
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }

}));

// Route that creates a new user.
router.post('/users/:id', asyncHandler(async(req, res) => {

  try {
    const user = await User.findByPk(req.params.id)

    await user.update(req.body);
    res.status(201).json({ "message": "Account successfully updated!" });
  
    res.redirect('/');
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
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
  res.status(200);
  res.json(course);
}));

// Route that creates new course 
router.post('/courses', asyncHandler(async(req, res) => {

  try {
    const course = req.body;
    course.userId = 3;
  
    await Course.create(course);
    res.status(201).json({ "message": "Course successfully created!" });
  
    res.redirect(`/courses/:id`);
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

// Route that updates the corresponding course
router.put('/courses/:id', asyncHandler(async(req, res) => {

  try {
    const course = await Course.findByPk(req.params.id)

    await course.update(req.body);
  
    res.status(204);
    res.json({});
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

// Route that deletes the corresponding course 
router.delete('/courses/:id', asyncHandler(async(req, res) => {
  const course = await Course.findByPk(req.params.id)

  if (course) {
    await course.destroy();
  
    res.status(204);
    res.json({});
  } else {
    res.status(404).json({
      message: 'Route Not Found',
    });
  }

}));

module.exports = router;
