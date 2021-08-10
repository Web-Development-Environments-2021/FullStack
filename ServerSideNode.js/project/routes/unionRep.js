var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
// define the only  UnionRep user
const UnionRep_ID=1;

/**
 * Authenticate all incoming requests by middleware and check that the User is UnionRep
 */

//---------- check that user is logged in and Union Representive --------------//
  router.use(async function (req, res, next) {
    if (req.session && req.session.user_id==UnionRep_ID) {
      DButils.execQuery("SELECT user_id FROM dbo.Users")
        .then((users) => {
          if (users.find((x) => x.user_id == req.session.user_id )) {
              req.user_id = req.session.user_id;
              next();
          }
        })
        .catch((err) => next(err));
    } else {
      res.sendStatus(401);
    }
  });



//---------------------- add to system new game-------------//
router.post("/addNewGame", async (req, res, next) => {
  try {
    const date=req.body.date;
    var d1 = Date.parse(date); // returns a valid JavaScript date , null if the date format isnt valid
    if(!d1){
      throw {status:400,message:"ilegal date from input"};
    }
    const time=req.body.time;
    const home_team=req.body.home_team;
    const away_team=req.body.away_team;



    const stadium=req.body.stadium;
    if(/[^a-zA-Z" "]/.test(stadium) ){
      throw {status:400, message:"stadium can contain only alpha-beta(a-z) characters"};
    }
    function randomNumber(min, max){
    const r = Math.random()*(max-min) + min
    return Math.floor(r)
}
    const rand=randomNumber(0,10);
    const Referee=await DButils.execQuery('SELECT name FROM Referee ');


    await DButils.execQuery(
      `INSERT INTO dbo.Games (date,time,home_team,away_team,stadium,Referee) VALUES ('${date}','${time}','${home_team}','${away_team}','${stadium}','${Referee[rand].name}')`
      );
  
    res.status(201).send("Game added succesfully");
  } catch (error) {
    next(error);
  }
});


//----------------------add result to the a game-------------------//
router.post("/addResult", async (req, res, next) => {
  try {
    const game_id = req.body.game_id;
    if(!(game_id>0  && Number.isInteger(game_id))&&  !isNaN(game_id)){
      throw{status:400,message:" game id must be positive int!!!"}
    }
    const home_goal=req.body.home_goal;
    const away_goal=req.body.away_goal;
    if (home_goal<0 | away_goal<0  | !Number.isInteger(home_goal) |  !Number.isInteger(away_goal) | isNaN(home_goal) | isNaN(away_goal)){
      throw{status:400,message:" home goal and away goal must be int bigger then -1"}
    }
    const ifPast=await DButils.execQuery(`select date from Games WHERE game_id='${game_id}' and date<GETDATE()`)
    if(ifPast.length==0){
      res.status(400).send("this in not a past game");
    }
    await DButils.execQuery(
      `update Games set
        Games.home_goal=${home_goal},
        Games.away_goal=${away_goal}
      where game_id=${game_id};`
      );
        res.status(201).send("Result added");
  } catch (error) {
    next(error);
  }
});
//-----------adding event to past game--------------//
router.post("/addEvent", async (req, res, next) => {
  try {
    console.log(req.body);
    const game_id = parseInt(req.body.game_id);

    if(!(game_id>0  && Number.isInteger(game_id))&&  !isNaN(game_id)){
      throw{status:400,message:" game id must be positive int!!!"}
    }
    const minute=parseInt(req.body.minute);
    if(!(minute>0  && minute<120 && Number.isInteger(minute))&&  !isNaN(minute)){
      throw{status:400,message:" minute must be int between 0 to 120 "}
    }
    const decription=req.body.description;
    const eventType=req.body.eventType;
    const typeDict=["Goal", "Offside", "Foul", "Red Card", "Yellow card"," Injury", "Substitution"];
    if(! typeDict.includes(eventType)){
      throw{ status:400,message:"no event type with this name "}
    }
    const ifPast=await DButils.execQuery(`select date from Games WHERE game_id='${game_id}' and date<GETDATE()`)
    if(ifPast.length==0){
      res.status(400).send("this in not a past game");
    }
    await DButils.execQuery(
      `INSERT INTO dbo.Events VALUES ('${game_id}',NULL,NULL,'${minute}','${eventType}','${decription}')
      update Events
      set
        Events.date=(select date from Games WHERE game_id='${game_id}'),
        Events.time=(select time from Games WHERE game_id='${game_id}')
      WHERE game_id='${game_id}';`
      
      );
        res.status(201).send("event added");
  } catch (error) {
    next(error);
  }
});



module.exports = router;
