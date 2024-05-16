const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");
const { errorHandler } = require("../util");
const { HttpError } = require("../error");

const signup = errorHandler(async (req, res) => {
  const { email, password } = req.body;

  throw new HttpError(400, "Something huevo");

  const userDoc = models.User({
    email,
    password: await argon2.hash(password),
  });

  const refreshTokenDoc = models.RefreshToken({
    owner: userDoc.id,
  });

  await userDoc.save();
  await refreshTokenDoc.save();

  const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);
  const accessToken = createAccessToken(userDoc.id);

  return {
    id: userDoc.id,
    accessToken,
    refreshToken,
  };
});

const createAccessToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );
};

const createRefreshToken = (userId, refreshTokenId) => {
  return jwt.sign(
    {
      userId,
      tokenId: refreshTokenId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  signup,
};
