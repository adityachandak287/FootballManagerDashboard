require("dotenv").config();
const mongo = require("mongodb").MongoClient;
const fs = require("fs");

mongo.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Connected to MongoDB");
    const db = client.db("fifa");
    const teamsCollection = db.collection("teams");

    const fileData = fs.readFileSync("teamLogos.json");
    const teamData = JSON.parse(fileData);

    let teams = [];
    for (const team of Object.keys(teamData)) {
      teams.push(teamData[team]);
    }

    teamsCollection
      .insertMany(teams)
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
  }
);
