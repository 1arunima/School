const express = require('express');
const { Login, Logout, getCount } = require('../Controller/Auth'); // Importing the controller functions
const router = express.Router();

router.post('/login', Login); // Login route
router.post('/logout', Logout); // Logout route
router.get('/count', getCount); // Route to get counts (staff, books, students, etc.)

module.exports = router;
