const Category = require('../controllers/category');
const Parameter = require('../config/parameters');

module.exports = (app, router, conn) => {

	// get category
	router.get(`${Parameter.app_prefix}/getCategoryList`, Category.getCategoryList);
	// save category
	router.post(`${Parameter.app_prefix}/saveCategory`, Category.saveCategory);

	app.use(router);
};