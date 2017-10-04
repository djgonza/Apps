var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var User = require('models/user.model');

var service = {};

service.getUser = getUser;
service.getUserInfo = getUserInfo;
service.authenticate = authenticate;
service.authenticateByEmail = authenticateByEmail;
service.create = create;
//service.update = update;
//service.remove = remove;

module.exports = service;

function getUserInfo (id) {

	var deferred = Q.defer();
	User.findOne({_id: id}, {password:0})
	.then(user => {
		deferred.resolve(user);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function getUser (username) {

	var deferred = Q.defer();

	User.findOne({username})
	.then(user => {
		deferred.resolve(user);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function getUserByEmail (email) {

	var deferred = Q.defer();

	User.findOne({'email': email})
	.then(user => {
		deferred.resolve(user);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function authenticateByEmail(email, password) {

	var deferred = Q.defer();

	getUserByEmail(email).then(user => {
		if (user && bcrypt.compareSync(password, user.password)) {
			// authentication successful
			deferred.resolve({
				token: jwt.sign({ id: user._id }, config.secret)
			});
		} else {
			// authentication failed
			deferred.resolve();
		}

	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;
}

function authenticate(username, password) {

	var deferred = Q.defer();

	getUser(username).then(user => {
		if (user && bcrypt.compareSync(password, user.password)) {
			// authentication successful
			deferred.resolve({
				token: jwt.sign({ id: user._id }, config.secret)
			});
		} else {
			// authentication failed
			deferred.resolve();
		}

	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;
}

function create(userParam) { //Create user

	let deferred = Q.defer();

	// validation
	getUser(userParam.username).then(user => {
		if (user) {
			// username already exists
			deferred.reject('Username "' + userParam.username + '" is already taken');
		} else {
			createUser(userParam).then(createdUser => {
				//Return creted user
				deferred.resolve(createdUser);
			});
		}

	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;
}

function createUser(userParam) { //Create user and return this

	let deferred = Q.defer();

	new User (userParam)
	.save()
	.then(createdUser => {
		deferred.resolve(createdUser);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}