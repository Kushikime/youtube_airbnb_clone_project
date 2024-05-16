const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
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

    res.json({
      id: userDoc.id,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

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
