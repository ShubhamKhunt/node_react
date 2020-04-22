require('dotenv').config({ path: './.env' });

current_version = (process.env.NODE_ENV == 'dev') ? process.env.APP_DEV_VERSION : process.env.APP_RELEASE_VERSION;

module.exports = {
	env: process.env.NODE_ENV || 'dev',
	jwt: {
		secret: "123"
	},
	server: {
		port: 3001
	},
	database: {
		uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
	},
	app_prefix: `/${process.env.API_PREFIX}/${current_version}`,
	current_version: current_version,
	routeConfig: {
		autoRoute: true // define routes which are named in export method in each controller file
	}
};