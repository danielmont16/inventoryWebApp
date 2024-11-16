var express = require('express');
var router = express.Router();
const User = require("../models/user");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Inventory WebApp", user: req.user });
});

// GET /login
router.get("/login", (req, res, next) => {
  // Obtain session messages if any
  let messages = req.session.messages || [];
  // Clear messages
  req.session.messages = [];
  // Pass messages to view
  res.render("login", { title: "Login", messages: messages, user: req.user });
});

// POST /login
// Syntax will be a bit different since login will be handled by passport

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/login",
    failureMessage: "Invalid credentials",
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/login",
    failureMessage: "Invalid credentials",
  })
);

// GET /register
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Create a new account", user: req.user });
});

//POST /register
router.post("/register", (req, res, next) => {
  // Create a new user based on the information from the page
  // three parameters: new user object, password, callback function
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        // take user back and reload register page
        return res.redirect("/register");
      } else {
        // log user in and redirect
        req.login(newUser, (err) => {
          res.redirect("/products");
        });
      }
    }
  );
});

// GET /logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/login");
  });
});

// GET /github
// triggers when user clicks on the "Login with Github" icon on the login page
// user is sent to github.com in order to provide credentials
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user.email"] })
);

// GET /github/callback
router.get(
  "/github/callback", // path
  passport.authenticate("github", { failureRedirect: "/login" }), // github middleware
  (req, res, next) => {
    res.redirect("/products");
  } // custom middleware (success)
);


// GET /Google
// triggers when user clicks on the "Google" icon on the login page
// user is sent to google.com in order to provide credentials
router.get('/auth/google/',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  ));

// GET /Google/callback
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res, next) => {
    res.redirect("/products");
  }// custom middleware (success)
);

module.exports = router;
