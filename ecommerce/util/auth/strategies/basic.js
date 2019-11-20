const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");
const MongoLib = require("../../../lib/mongo");

passport.use(
  new BasicStrategy(async (username, password, cb) => {
    try {
      const mongoDB = new MongoLib();
      const [user] = await mongoDB.getAll("users", { username });
      if (!user) {
        return cb(Boom.unauthorized(), false);
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(Boom.unauthorized(), false);
      }
      return cb(false, user);
    } catch (error) {
      return cb(error, false);
    }
  })
);
