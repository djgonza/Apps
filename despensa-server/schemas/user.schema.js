var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

module.exports = new Schema({

	firstName : {
		type: String
	},
	lastName:{
		type: String
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true,
		set: (password) => { return bcrypt.hashSync(password, 10); }
	},
	createdAt: { 
		type: Date, 
		default: Date.now,
	}

});