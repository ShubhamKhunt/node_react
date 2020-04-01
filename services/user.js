const async = require('async');
const validator = require('validator');

const Base = require('./base')

class User extends Base{
	constructor(req, res){
		super(req, res)
	}

	// save user
	save(){
		return this.awaiter((fn) => {
			this.UserModel.create(this.req.body, function(err, result){
				if (err) {
					fn(false, err); return;
				}
	
				fn(result, false); return;
			})
		});
	}
	
	// get user list
	getUserList(){
		return this.awaiter((fn) => {
			this.UserModel.find({"active": true})
			.select('_id firstname lastname username')
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

module.exports = User;


// save(){
// 	return new Promise((resolve, reject) => {
// 		function fn(result, err){
// 			if(err){
// 				// reject(err)
// 				resolve(err) // YES, resolve with error
// 				return;
// 			}

// 			resolve(result)
// 		}

// 		this.UserModel.create(this.req.body, function(err, result){
// 			if (err) {
// 				// save error in mongo log
// 				Error.save(err)

// 				fn(false, err); return;
// 			}

// 			fn(result, false); return;
// 		})
// 	})
// }