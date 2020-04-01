const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true,
			bcrypt: true
		},
		firstname: {
			type: String,
			trim: true,
			required: true
		},
		lastname: {
			type: String,
			trim: true,
			required: false,
			default: ''
		},
		active: {
			type: Boolean,
			default: true
		}
	},
	{ collection: 'users' }
);

UserSchema.pre('save', function(next) {
	if (!this.isNew) {
		next();
	}

	next();
});

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

UserSchema.index({ username: 1 });

module.exports = exports = mongoose.model('User', UserSchema);