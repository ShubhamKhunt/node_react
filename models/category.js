const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			index: true,
			required: true
		},
		description: {
			type: String,
			trim: true,
			required: true
		},
		image: {
			type: Number,
			trim: true,
			default: 0
		},
		active: {
			type: Boolean,
			default: true
		}
	},
	{ collection: 'category' }
);

CategorySchema.plugin(timestamps);
CategorySchema.plugin(mongooseStringQuery);

CategorySchema.index({ name: 1 });

module.exports = exports = mongoose.model('Category', CategorySchema);