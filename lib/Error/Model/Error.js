const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const ErrorSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			trim: true,
			default: ''
		},
		code: {
			type: String,
			trim: true,
			default: ''
		},
		errmsg: {
			type: String,
			trim: true,
			default: ''
		}
	},
	{ collection: 'error_log' }
);

ErrorSchema.plugin(timestamps);
ErrorSchema.plugin(mongooseStringQuery);

module.exports = exports = mongoose.model('Error', ErrorSchema);