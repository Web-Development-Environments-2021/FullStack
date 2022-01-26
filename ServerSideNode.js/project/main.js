//#region global imports
const DButils = require("./routes/utils/DButils");
const axios = require("axios");
const bcrypt = require("bcryptjs");

// require("dotenv").config();

var express = require("express");
var path = require("path");
const session = require("client-sessions");
var logger = require("morgan");
var cors = require("cors");
var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 24 * 60 * 60 * 1000, // expired after 20 sec
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: false,
    },
    //the session will be extended by activeDuration milliseconds
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

// middleware to serve all the needed static files under the dist directory - loaded from the index.html file
app.use(express.static("dist"));

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

const port = process.env.PORT || "3000";

//-----------initiate router----------/

const auth = require("./routes/auth");
const users = require("./routes/users");
const unionRep = require("./routes/unionRep");
const league = require("./routes/league");
const team = require("./routes/team");
const player = require("./routes/player");


//#region cookie middleware
//------------check that the user is already logged in ------------//
app.use(function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});

//#endregion

// ----> For cheking that our server is alive

app.get("/alive", (req, res) => res.send("I'm alive"));

// Routings
app.use("/unionRep", unionRep);
app.use("/user", users);
app.use("/league", league);
app.use("/team", team);
app.use("/player",player);
app.use(auth);



app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

//---------  Server start to listening----------------/
 
const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

