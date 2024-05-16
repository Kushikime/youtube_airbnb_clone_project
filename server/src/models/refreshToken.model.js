const { Schema, model } = require("mongoose");

const refreshTokenSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const RefreshToken = model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
