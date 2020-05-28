const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var mongo = require("mongodb").MongoClient;

const app = express();
app.use(cors());

const mongoURI = "mongodb://localhost:27017";
const PORT = 8080;

app.use(bodyParser.json({ extended: true }));
// app.set("view engine", "ejs");

mongo.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Connected to MongoDB");
    const db = client.db("fifa");
    const statsCollection = db.collection("stats");
    const teamsCollection = db.collection("teams");
    app.get("/", (req, res) => {
      statsCollection.find().toArray(function (err, stats) {
        if (err) console.log(err);

        res.send({ stats: stats.splice(0, 10) });
      });
    });

    app.get("/clubNames", (req, res) => {
      teamsCollection.find({}).toArray((err, teams) => {
        if (err) {
          console.error("Fetching Club Names" + err);
          res
            .status(200)
            .send({ success: false, message: "Could not fetch club names" });
        }
        response = {
          success: true,
          clubNames: teams,
        };
        res.status(200).send(JSON.stringify(response));
      });
    });

    app.post("/club", (req, res) => {
      statsCollection
        .find({ Club: req.body.club })
        .toArray(function (err, club) {
          if (err) console.log(err);
          console.log(req.body);
          // console.log(club);
          res.send({ club: club });
        });
    });

    app.post("/test", (req, res) => {
      console.log(req.body);
      res.send(req.body);
    });

    // app.get("/team/:teamname", (req, res) => {
    //   db.collection("matches")
    //     .find({
    //       $or: [{ team1: req.params.teamname }, { team2: req.params.teamname }]
    //     })
    //     .toArray(function(err, matches) {
    //       if (err) console.log(err);

    //       var teamWise = {};

    //       matches.forEach(match => {
    //         var currSeason = "" + match["season"];
    //         if (!Object.keys(teamWise).includes(currSeason)) {
    //           teamWise[currSeason] = [];
    //         }
    //         teamWise[currSeason].push(match);
    //       });
    //       // res.send(teamWise);
    //       res.render("team", {
    //         seasons: teamWise
    //       });
    //     });
    // });

    app.listen(PORT, function () {
      console.log(`Listening on port ${PORT}`);
    });
  }
);
