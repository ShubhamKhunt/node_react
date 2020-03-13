/**
 * USER APIs
 */

var express = require('express');
var router = express.Router();

var dbObj = require('../../../config/Database');

// Load Auth component
var Auth = require('../../../config/auth');

// User Model
var Users = require('../../../model/User.js');

router.all('/getPayload', (req, res) => {

  var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJUZXN0IiwibGFzdG5hbWUiOiJQaHAiLCJ1c2VybmFtZSI6InRlc3QucGhwIiwiZG9iIjoiMTk5NS0yNC0wNCIsImlhdCI6MTU4NDEwMTkxOH0.YJNCbvNG3nmIy9dMnHqbE2I1HSUNUSrLsqp90gjM19TfP4Gc8AdYQ7axMp-LSZqOxTCN03B08GLKzVna4RCKtefiHc5sQG6GDm7niG9T5xCT8LUqsbbEzyzRPHF9RPVpKrNLfTO4s5WoLZAiejBmDj8059Qwm6cb5nLTE3wxA-tw20USMOO4nKlkrjlz8Khk3EaNUExKGr74XezhDzcAJKFTy8YsUNrNBi-1Syo-mEhwhq7Kwj1JSeLFLGFX7rgGbNELXVOhOI0qZlI7PnL2rUqBYQJ_bRhVnpXKXSjdYfBsOR0rtL94xpSxj2979C3HkJr7v79nCbNZLf4rxNP4ad6U9QjMmpvSsyjkLaQV1-wr2nYtB_HoMv6nVktKSf4DwAYq5z3VzCwp5umKPiTeD1Um3u5q7Yfqu-nSVsw5YQtxSO6Mn405MJittmZp-myUH75UFAPkCGxjjrJ74CulH8RY6Z6KjkagG8e3AzZ6HO1KlMKYwqKPHxxM6c-VhFkkmFo-4wKnerEa2KtSfaEkPE4cXjc0JsWT9CaF58csB9Nu1--pX8yR_sDaWHWmaX6MauMQ_12SDUbwGO8zVwbVj643sbxt95FLoFJDNnMqy0bGJVTzQGk7bPk_-80nOKRvos8haRrH3Pm6Oa3243QH4fn7cdj2QMAOT8DheLPLO8M';
  const payLoad = Auth.getPayload(token);

  res.send({
    status: true,
    data: {
      user: payLoad
    }
  });
});

router.all('/getToken', (req, res) => {

  let payLoad = {
    firstname: 'Test',
    lastname: 'Php',
    username: 'test.php',
    dob: '1995-24-04'
  };

  const token = Auth.getToken(payLoad);

  res.send({
    status: true,
    data: {
      auth: token
    }
  });
});

// save User
router.all('/saveUser', (req, res) => {

  let payLoad = {
    firstname: 'Test',
    lastname: 'JS',
    username: 'test.js',
    password: '123456',
    dob: '2020-03-13'
  };

  // create object
  let userModel = Users.Model;
  let loadUser = new userModel(payLoad);
  
  // save user
  loadUser.save();

  const token = Auth.getToken(payLoad);

  console.log(token);

  res.send({
    status: true,
    data: {
      auth: token,
      user: payLoad
    }
  });
});

// get User
router.all('/getUser', (req, res) => {
  // let _user = {
  //   'id': 1,
  //   'name': 'Test JS'
  // };

  console.log(dbObj);

  const db = dbObj.getObject();
  console.log(db);
  const user = db.collection('users')

  let userCollection = Users.getUsers(user).then(
    result => {
      console.log(result);
      res.send({
        status: true,
        data: result
      });
    },
    error => alert(error)
  );
})

module.exports = router;