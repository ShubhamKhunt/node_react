const express = require('express');
const config = require('../config/parameters');

const fs = require('fs');
const path = require('path');

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
				
				// require('../routes/user.js')(this.app);
				fs.readdirSync(path.join(__dirname, '../routes')).map(file => {

					// load module and sub module routes
					require('../routes/' + file)(this.app, this.router, this.connection);

					resolve(true);
				});
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
		});
	}
}

module.exports = new Webroot();