const fs = require('fs');
const path = require('path');

module.exports = class Base{
	constructor(req, res){
		// set class name which is being executing
		// this.setClass();

		// bind req and res with this in order to access in inherited classes
		this.req = req;
		this.res = res;

		let currentClass = this.constructor.name;
		let currentModuleServicePath = path.join(__dirname, '../services/'+currentClass)+'.js'

		// bind service layer
		if (fs.existsSync(currentModuleServicePath)) {
			// load respected service module
			const serviceLayer = require(currentModuleServicePath);

			let classServiceName = `${currentClass}Service`;

			// add to sub class
			this[classServiceName] = new serviceLayer(req, res);
			// this._service = new serviceLayer(req, res);
		}

		let currentModuleModelPath = path.join(__dirname, '../models/'+currentClass)+'.js'

		// bind service layer
		if (fs.existsSync(currentModuleModelPath)) {
			// load respected service module
			let classModelName = `${currentClass}Model`;
			this[classModelName] = require(currentModuleModelPath);
		}
	}

	setClass(){
		// abandoned

		this.currentSnap = this.constructor.name;

		// console.log(this.currentSnap);
	}

	static getObject(){
		// abandoned
	}
}