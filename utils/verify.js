const jwt = require("jsonwebtoken");

const { createError } = require("./error");

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) return next();
    return next(
      createError({ status: 403, message: "You are not the admin!" })
    );
  });
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return next(
      createError({ status: 401, message: "You are not authenticated!" })
    );

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err)
      return next(createError({ status: 403, message: "Token is invalid!" }));

    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) return next();
    return next(
      createError({ status: 403, message: "You are not authorized!" })
    );
  });
};

module.exports = { verifyAdmin, verifyToken, verifyUser };
