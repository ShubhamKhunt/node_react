const async = require('async');
const validator = require('validator');

const Base = require('./base')

class Category extends Base{
	constructor(req, res){
		// bind req and res with this
		super(req, res);
	}

	async getCategoryList(){
		try{
			let data = await this.CategoryService.getList();
			this.res.send({
				success: (data.code) ? false : true,
				data: (data.code) ? {code: data.code, msg: data.errmsg} : data
			});
		} catch(e){
			this.res.send({
				status: false,
				err: e
			});
		}
	}

	async saveCategory(){
		try{
			let data = await this.CategoryService.save();
			this.res.send({
				success: (data.code) ? false : true,
				data: (data.code) ? {code: data.code, msg: data.errmsg} : data
			});
		} catch(e){
			this.res.send({
				status: false,
				err: e
			});
		}
	}
}

// save Category
exports.saveCategory = (req, res) => {
	let obj = new Category(req, res);
	obj.saveCategory();
} 

// get collection
exports.getCategoryList = (req, res) => {
	let obj = new Category(req, res);
	obj.getCategoryList();
}