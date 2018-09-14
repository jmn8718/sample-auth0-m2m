const express = require('express');
const router = express.Router();

const {
  authorizedRequest
} = require('../lib')

const Auth0 = require('../lib/auth0')

const {
  checkJwt
} = require('../middleware')

router.get('/', function (req, res, next) {
  return res.json({
    name: process.env.AUTH0_NAME,
  });
});

const handleProtectedRequest = async function (req, res, next) {
  const {
    url,
    user
  } = req
  console.log(user)
  try {
    const token = `${Auth0.tokenType} ${Auth0.accessToken}`
    let data = await authorizedRequest(`${process.env.PRIVATE_SERVER_URL}${url}`, token)
    return res.json({
      url,
      data
    });
  } catch (err) {
    if (err.statusCode && err.error) {
      res.status(err.statusCode).json(err.error)
    } else {
      throw err
    }
  }
}

router.get('/protected', checkJwt, handleProtectedRequest);
router.get('/users', checkJwt, handleProtectedRequest);
router.get('/logs', checkJwt, handleProtectedRequest);
router.get('/apis', checkJwt, handleProtectedRequest);

module.exports = router;