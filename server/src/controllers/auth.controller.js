const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");
const { errorHandler, withTransaction } = require("../util");
const { HttpError } = require("../error");

const signup = errorHandler(
  withTransaction(async (req, res, session) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new HttpError(403, "Provide email and password");
    }

    const userDoc = models.User({
      email,
      password: await argon2.hash(password),
    });

    const refreshTokenDoc = models.RefreshToken({
      owner: userDoc.id,
    });

    await userDoc.save({ session });
    await refreshTokenDoc.save({ session });

    const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);
    const accessToken = createAccessToken(userDoc.id);

    return {
      id: userDoc.id,
      accessToken,
      refreshToken,
    };
  })
);

const login = errorHandler(
  withTransaction(async (req, res, session) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new HttpError(401, "Provide email and password");
    }

    const userDoc = await models.User.findOne({
      email,
    })
      .select("password")
      .exec();

    if (!userDoc) {
      throw new HttpError(401, "Wrong email or password");
    }

    await verifyPassword(userDoc.password, req.body.password);

    await models.RefreshToken.deleteMany({
      owner: userDoc.id,
    });

    const refreshTokenDoc = models.RefreshToken({
      owner: userDoc.id,
    });

    refreshTokenDoc.save({ session });

    const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);
    const accessToken = createAccessToken(userDoc.id);

    return {
      id: userDoc.id,
      accessToken,
      refreshToken,
    };
  })
);

const newRefreshToken = errorHandler(
  withTransaction(async (req, res, session) => {
    const currentRefreshToken = await validateRefreshToken(
      req.body.refreshToken
    );
    const refreshTokenDoc = models.RefreshToken({
      owner: currentRefreshToken.userId,
    });

    await refreshTokenDoc.save({ session });
    await models.RefreshToken.deleteOne({
      owner: currentRefreshToken.userId,
    });

    const refreshToken = createRefreshToken(
      currentRefreshToken.userId,
      refreshTokenDoc.id
    );
    const accessToken = createAccessToken(currentRefreshToken.userId);

    return {
      id: currentRefreshToken.userId,
      accessToken,
      refreshToken,
    };
  })
);

const logout = errorHandler(
  withTransaction(async (req, res, session) => {
    const refreshToken = await validateRefreshToken(req.body.refreshToken);

    await models.RefreshToken.deleteOne(
      { _id: refreshToken.tokenId },
      { session }
    );

    return {
      success: true,
    };
  })
);

const logoutAll = errorHandler(
  withTransaction(async (req, res, session) => {
    const refreshToken = await validateRefreshToken(req.body.refreshToken);

    await models.RefreshToken.deleteMany(
      { owner: refreshToken.userId },
      { session }
    );

    return {
      success: true,
    };
  })
);

const newAccessToken = errorHandler(
  withTransaction(async (req, res) => {
    const refreshToken = await validateRefreshToken(req.body.refreshToken);
    const accessToken = createAccessToken(refreshToken.userId);

    return {
      id: refreshToken.userId,
      accessToken,
      refreshToken: req.body.refreshToken,
    };
  })
);

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

const verifyPassword = async (hashedPassword, rawPassword) => {
  if (await argon2.verify(hashedPassword, rawPassword)) {
  } else {
    throw new HttpError(401, "Wrong email or password");
  }
};

const validateRefreshToken = async (token) => {
  const decodeToken = () => {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new HttpError(401, "Unathorized");
    }
  };

  const decodedToken = decodeToken();

  const tokenExists = await models.RefreshToken.exists({
    _id: decodedToken.tokenId,
  });

  if (tokenExists) {
    return decodedToken;
  } else {
    throw new HttpError(401, "Unathorized");
  }
};

module.exports = {
  signup,
  login,
  newRefreshToken,
  newAccessToken,
  logout,
  logoutAll,
};
