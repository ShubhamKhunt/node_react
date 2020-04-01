const User = require('../controllers/user');
const Parameter = require('../config/parameters');

module.exports = (app, router, conn) => {

	// get user collection
	router.get(`${Parameter.app_prefix}/getUserList`, User.getUserList);
	// save user
	router.post(`${Parameter.app_prefix}/saveUser`, User.saveUser);

	app.use(router);
};