const async = require('async');
const validator = require('validator');

const Base = require('./base')

class Category extends Base{
	constructor(req, res){
		super(req, res)
	}

	// save user
	save(){
		return this.awaiter((fn) => {
			this.CategoryModel.create(this.req.body, function(err, result){
				if (err) {
					fn(false, err); return;
				}
	
				fn(result, false); return;
			})
		});
	}
	
	// get category list
	getList(){
		return this.awaiter((fn) => {
			this.CategoryModel.find({"active": true})
			.select('_id name description image')
			.exec(function(err, result){
				if (err) {
					fn(false, err); return;
				}

				console.log(result)

				fn(result, false); return;
			})
		})
	}
}

module.exports = Category;