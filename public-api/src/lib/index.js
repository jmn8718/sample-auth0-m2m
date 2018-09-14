const request = require('request-promise');

const getToken = function () {
	let body = {
		audience: process.env.AUTH0_AUDIENCE,
		grant_type: 'client_credentials',
		client_id: process.env.AUTH0_CLIENT_ID,
		client_secret: process.env.AUTH0_CLIENT_SECRET
	};
	return requestToAuth0('/oauth/token', 'POST', {
		body
	});
};

const requestToAuth0 = function (url = '', method = '', options = {}) {
	const {
		headers = {}, body = {}, ...rest
	} = options;
	let requestOptions = {
		method,
		url: `https://${process.env.AUTH0_DOMAIN}${url}`,
		headers: {
			'cache-control': 'no-cache',
			'content-type': 'application/json',
			...headers
		},
		body,
		...rest,
		json: true
	};
	return request(requestOptions).catch((err) => {
		console.error(url, err.message);
		throw err;
	});
};

const authorizedRequest = function (url, token, method = 'GET', options = {}) {
	const {
		headers = {}, body = {}, ...rest
	} = options;
	let requestOptions = {
		method,
		url,
		headers: {
			'cache-control': 'no-cache',
			'content-type': 'application/json',
			'Authorization': token,
			...headers
		},
		body,
		...rest,
		json: true
	};

	return request(requestOptions).catch((err) => {
		// console.error(url, err);
		throw err;
	});
}
module.exports = {
	getToken,
	requestToAuth0,
	authorizedRequest
}