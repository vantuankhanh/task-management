const jwt = require("jsonwebtoken");
const { errorHandler } = require("../loggers/errorHandler");
const { response } = require("../utils/responseBuilder");

const VerifyToken = (req, res, next) => {
  try {
    console.log("----------> Verifying token...");

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return response(res, null, "Authentication is required", 401);
    }

    const checkBearer = ("" + authHeader).startsWith("Bearer ");
    if (!checkBearer) {
      return response(res, null, "Bearer is required", 400);
    }

    const token = authHeader.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        return response(res, null, "JWT expired", 401);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    errorHandler(error, "verify token");
    return response(res, null, "Authentication is required", 401);
  }
};

module.exports = VerifyToken;
