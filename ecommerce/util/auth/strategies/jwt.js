const passport = require("passport");
const Boom = require("@hapi/boom");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { config } = require("../../../config");
const MongoLib = require("../../../lib/mongo");

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (payload, cb) => {
      const mongoDB = new MongoLib();
      try {
        const [user] = await mongoDB.getAll("users", { username: payload.sub });
        if (!user) {
          return cb(Boom.unauthorized(), false);
        }
        cb(false, user);
      } catch (error) {
        cb(Boom.unauthorized(), false);
      }
    }
  )
);
