const express = require('express');
const cookieParser = require('cookie-parser')
const config = require('../config/parameters');

const fs = require('fs');
const path = require('path');
const open = require('open');

const bodyParser = require('body-parser')

class Webroot{
	constructor(){
		// prepare global vars
		this.app = express();

		this.router = express.Router();

		// connection object
		this.connection = '';

		global.app = this;
	}

	async init(){
		// connect db
		// this.connection = await this.connectDB();
		await this.connectDB();

		// configure routes
		await this.prepareRoutes();

		// start server
		await this.startServer();
	}

	prepareRoutes(){
		return new Promise((resolve, reject) => {
			try{
				// access json body
				this.app.use(bodyParser.json());
				this.app.use(cookieParser());
				
				if(config.routeConfig.autoRoute){
					let app = this.app;
					let router = this.router;

					// generate router based on controller
					let controllerPath = path.join(__dirname, '../controllers')
					fs.readdirSync(controllerPath).map(file => {

						// no need to add base as a route
						if(file != 'base.js'){
							const lineReader = require('line-reader');

							// load controller file
							const controller = require(controllerPath +'/'+ file);

							lineReader.eachLine(controllerPath +'/'+ file, function(line) {
								// router name will be what param used in export in each controller file
								if(line.startsWith('exports')){
									let str = line;
									str = str.split('=');
									if(str.length > 0){
										str = str[0].trim();
										str = str.replace('exports.', '')

										// route forcefully available in get and post both
										router.all(`${config.app_prefix}/${str}`, controller[str]);
									}
								}
							});

							app.use(router);
							resolve(true);
						}
					});	
				} else {
					// read routes from route files
					fs.readdirSync(path.join(__dirname, '../routes')).map(file => {

						// load module and sub module routes
						require('../routes/' + file)(this.app, this.router, this.connection);

						resolve(true);
					});	
				}
			} catch(err){
				reject(err)
			}
		})
	}

	connectDB(){
		return new Promise((resolve, reject) => {
			const mongoose = require('mongoose');
			mongoose.set('useCreateIndex', true);
			const conn = mongoose.connect(config.database.uri, { useNewUrlParser: true, useUnifiedTopology: true });
	
			conn.then(db => {
				console.log('Db connection initiated');
				resolve(db);
			})
			.catch(err => {
				// if (err.message.code === 'ETIMEDOUT') {
				// 	mongoose.connect(config.database.uri);
				// } else {
				// 	console.log('Db connection failed: ', err);
				// }
				console.log(err);
				reject(err);
			});
		});
	}

	startServer(){
		console.log('server starts');
		this.app.listen(config.server.port, err => {
			if (err) {
				console.log(err);
				return;
			}

			console.log(`server is ready`);
			// open('http://localhost:3001/');
		});
	}
}

module.exports = new Webroot();