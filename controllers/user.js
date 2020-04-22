const async = require('async');
const validator = require('validator');

const Base = require('./base')
// const UserModel = require('../models/user');

const JWT = require('../lib/JWT/Controller/JWT');

class User extends Base{
	constructor(req, res){
		// bind req and res with this
		super(req, res);
	}

	async getUserList(){

		try{
			console.log(this.req.cookies);

			let data = await this.UserService.getUserList();
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

	async saveUser(){
		try{
			let data = await this.UserService.save();
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

	getUser(){

		this.res.send({
			success: true,
			data: {
				authorization: JWT.getToken()
			}
		});
	}

	getToken(){

		this.res.cookie('custom_cookie_param', 'THIS_IS_ID')

		this.res.send({
			success: true,
			data: {
				authorization: '121c31c1sd3c1sd318fger8ger98g45gr45g44er54'
			}
		});
	}

	// static setObject(req, res){
	// 	console.log('setObject');
		
	// 	this.req = req;
	// 	this.res = res;
	// 	let obj = new User(req, res);
	// 	this.classObj = obj;
	// 	this.cloneObj = obj;
	// }

	static getObject(req, res){

		this.req = '';
		this.res = '';

		this.req = req;
		this.res = res;

		return new User(req, res);
	}
}

// save User
exports.saveUser = (req, res) => {
	// let user = User.getObject(req, res);
	let user = new User(req, res);
	user.saveUser();
} 

exports.getUserList = (req, res) => {

	let user = new User(req, res);
	user.getUserList();
}

exports.getUser = (req, res) => {
	let user = new User(req, res);
	user.getUser();
}

// temporory
exports.getToken = (req, res) => {
	let user = new User(req, res);
	user.getToken();
}