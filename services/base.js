const fs = require('fs');
const path = require('path');
const Error = require('../lib/Error/Controller/Error');

class Base{
	constructor(req, res){
		// bind req and res with this in order to access in inherited classes
		this.req = req;
		this.res = res;

		// bind custom model to this
		let currentClass = this.constructor.name;
		let currentModuleModelPath = path.join(__dirname, '../models/'+currentClass)+'.js'

		// bind custom service layer
		if (fs.existsSync(currentModuleModelPath)) {
			// load respected service module
			let classModelName = `${currentClass}Model`;
			this[classModelName] = require(currentModuleModelPath);
		}

		// bind Error Lib
		// this[Error] = require(path.join(__dirname, '../lib/Error/Controller/Error.js'));
	}

	wireUp(exec){
		return new Promise((resolve, reject) => {
			function fn(result, err){
				if(err){
					// save error in mongo log
					Error.save(err)

					// reject(err)
					resolve(err) // YES, resolve with error
					return;err
				}
	
				resolve(result)
			}
	
			let func = exec.bind(this);
			func(fn)
		})
	}
}

module.exports = Base