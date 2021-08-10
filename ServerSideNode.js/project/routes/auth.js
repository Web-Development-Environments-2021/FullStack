var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcryptjs");
const { Int } = require("mssql");
const users_utils=require('./utils/users_utils');
//----------Register a new User-------------//
router.post("/register", async (req, res, next) => {
  try {
    const max_id =await DButils.execQuery(
      "SELECT  Max(user_id)  FROM dbo.Users"
    );
    //----increment user id------/
    let new_id=max_id[0][""]+1;
    const users = await DButils.execQuery(
      "SELECT username FROM dbo.Users"
    );
    if (users.find((x) => x.username === req.body.username))
      throw { status: 409, message: "Username taken" };
    //hash the password
    let hash_password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    req.body.password = hash_password;
    await DButils.execQuery(
      `INSERT INTO dbo.Users (username,firstname,lastname,country,password,confirmedPassword,email,profileImage,user_id) VALUES ('${req.body.username}','${req.body.firstname}','${req.body.lastname}','${req.body.country}','${hash_password}','${req.body.confirmedPassword}','${req.body.email}','${req.body.profileImage}','${new_id}')`
      );
    res.status(201).send("user created");
  } catch (error) {
    next(error);
  }
});

//----------Login------------//

router.post("/Login", async (req, res, next) => {
  try {
    const user = (
      await DButils.execQuery(
        `SELECT * FROM dbo.Users WHERE username = '${req.body.username}'`
      ))[0];
  
    // check that username exists & the password is correct
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user.user_id;
    //insert favorites to


    // req.session.favorites=await users_utils.getFavoriteGames_cookie(user.user_id);
    let fav_Games=await users_utils.getFavoriteGames_cookie(user.user_id)
    console.log(fav_Games);
    res.status(200).send({"message":"login succeeded","user_id":user.user_id,"favoriteGames":fav_Games});

  } catch (error) {
    next(error);
  }
});


//--------- Logout----------//

router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
