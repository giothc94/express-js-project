const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { config } = require("../../config");

// Basic strategie
require("../../util/auth/strategies/basic");

const authApi = app => {
  app.use("/api/auth", router);
  router.post(
    "/token",
    passport.authenticate("basic", { session: false }),
    (req, res, next) => {
      const { user } = req;
      const payload = { sub: user.username, email: user.email };
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: "15m"
      });
      res.status(202).json({ access_token: token });
    }
  );
};
module.exports = authApi;