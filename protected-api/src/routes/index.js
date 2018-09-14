const express = require('express');
const router = express.Router();

const {
	checkJwt,
	checkScopes
} = require('../middleware')

router.get('/', function (req, res, next) {
	return res.json({
		name: process.env.AUTH0_NAME,
		port: process.env.PORT
	});
});

router.get('/protected', checkJwt, function (req, res, next) {
	return res.json({
		name: process.env.AUTH0_NAME,
		path: 'protected'
	});
});

router.get('/users', checkJwt, checkScopes(['read:users']), function (req, res, next) {
	return res.json({
		name: process.env.AUTH0_NAME,
		path: 'users'
	});
});

router.get('/logs', checkJwt, checkScopes(['read:logs']), function (req, res, next) {
	return res.json({
		name: process.env.AUTH0_NAME,
		path: 'logs'
	});
});

router.get('/apis', checkJwt, checkScopes(['read:apis']), function (req, res, next) {
	return res.json({
		name: process.env.AUTH0_NAME,
		path: 'apis'
	});
});

module.exports = router;