/**
 * APIs
 */

var express = require('express');
var router = express.Router();

var testRouter = require('./Test');
var userRouter = require('./User/user');

router.all('/', (req, res) => {
  // FILE PATH - ./User/user.js
})
.use('/user', userRouter)
.use('/test', testRouter);

module.exports = router;