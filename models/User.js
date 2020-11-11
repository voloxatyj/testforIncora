const { Schema, model, Types } = require('mongoose')

// Create Schema
const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	createdAt: {
		type: Date,
		required: true
	},
	links: [{
		type: Types.ObjectId,
		ref: 'Link'
	}]
})

module.exports = model('User', UserSchema)