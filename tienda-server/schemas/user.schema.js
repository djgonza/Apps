var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

module.exports = new Schema({

	firstName : {
		type: String,
		default: null
	},
	lastName:{
		type: String,
		default: null
	},
	username: {
		type: String,
		default: null
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		set: (password) => { return bcrypt.hashSync(password, 10); }
	},
	role: {
		type: Number,
		default: 0
	},
	createdAt: { 
		type: Date, 
		default: Date.now,
	}

});