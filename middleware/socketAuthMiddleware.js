const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { compareSync } = require("bcryptjs");

const socketAuthMiddleware = async (socket, next) => {
  console.log("Authenticating socket connection");

  const token = socket.handshake.auth.token;
  console.log("Token:", token);

  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(new Error("Authentication error"));
    }
    socket.user = user;
    next();
  } catch (error) {
    console.log("Authentication error:", error);
    return next(new Error("Authentication error"));
  }
};

module.exports = socketAuthMiddleware;
