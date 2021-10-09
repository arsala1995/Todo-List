const jwt = require('jsonwebtoken');

//Function that will check if the user is logged in and whether there is a token available.
const isAuth = function(req, res, next) {

  //checking if header is empty or contains token
  const authHeader = req.get('Authorization');
  if(!authHeader) {
    req.isAuth = false;
    return next();
  }

  //checking for the token part of the header to make sure there is a header
  const token = authHeader.split(' ')[1];
  if(!token || token === '') {
    req.isAuth = false;
    return next();
  }

  //we need to decode the token with the key that we encoded the token with.
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretkey');
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  //If the decoded token is incorrect we will return false
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  //if the decoded token is correct we will return true and will return userId for the user to perform tasks that need authentication.
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
}

module.exports = { isAuth }