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
    const teamsCollection = db.collection("stats");

    teamsCollection
      .findOne({ Club: "Tottenham Hotspur" })
      .then((data) => console.log(data));
  }
);
