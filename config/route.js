var express = require('express');
// var core = require('./core')
var router = express.Router();

// init route core modules
var apiRoute = require('../controllers/API/Api');

// function isAuthenticated(req, res, next) {
//     if(req.session.authenticated == 1){
//       next();
//     } else {
//       console.log(req);
//       res.redirect(`${core.base_url}/login`);
//     }
// };

router.all('/', (req, res) => {
    // load all modules
})
.use('/api', apiRoute);

module.exports = router;