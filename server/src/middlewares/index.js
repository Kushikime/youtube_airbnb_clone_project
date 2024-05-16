const jwt = require("jsonwebtoken");

const { HttpError } = require("../error");
const { errorHandler } = require("../util");

const verifyAccessToken = errorHandler((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new HttpError(401, "Unauthorized");

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    throw new HttpError(401, "Unauthorized");
  }
});

module.exports = {
  verifyAccessToken,
};
