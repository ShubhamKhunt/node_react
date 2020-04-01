var events = require('events');
var eventEmitter = new events.EventEmitter();

const ErrorModel = require('../Model/Error')

/**
 * START : Save Error Log
 * Listner - errorListener
 */
eventEmitter.addListener('errorListener', function (err) {
	// prepare json
	let errObj = {
		type: err.name,
		code: err.code,
		errmsg: err.errmsg
	};

	// add error log
	ErrorModel.create(errObj, function (err, user) {
		return;
	}); 
});

save = (err) => {
	// fire event Emitter
	eventEmitter.emit('errorListener', err)
}
/**
 * END : Save Error Log
 * Listner - errorListener
 */

 
// export save method for use
exports.save = (err) => {
	save(err);
}