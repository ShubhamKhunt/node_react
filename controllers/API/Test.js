var express = require('express');
var router = express.Router();

// get User
router.all('/', (req, res) => {
  let _user = {
    'id': 1,
    'name': 'Test JS'
  };

  res.send({
    status: true,
    data: _user
  });
})

module.exports = router;