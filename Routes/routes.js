var express = require('express');
const { getAllWorkouts, sendMessage, login, register } = require('./Methods');
const { verifyToken } = require('./verifytoken');
var router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/',verifyToken,getAllWorkouts);
router.post('/message',verifyToken,sendMessage);

//export this router to use in our index.js
module.exports = router;