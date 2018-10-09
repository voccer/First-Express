const configAuthFB = require("./auth");
const FacebookStrategy = require("passport-facebook").Strategy;
var routes = require("express").Router();
//
var db = require("../config/db");
var bodyParser = require("body-parser");
routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));
//
module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: configAuthFB.clientID,
        clientSecret: configAuthFB.clientSecret,
        callbackURL: configAuthFB.callbackURL
      },
      function(accessToken, refreshToken, profile, cb) {
        process.nextTick(() => {
          User.findOrCreate({ facebookId: profile.id }, function(err, user) {
            if (err) return done(err);
            if (user) return done(null, user);
            else {
              req.body.id = profile.id;
              req.body.token = profile.accessToken;
              req.body.name =
                profile.name.givenName + " " + profile.name.familyName;
              db.get("facebook")
                .push(req.body)
                .write();
              res.redirect("/users");
            }
          });
        });
      }
    )
  );
};
