const path = require("path");
require("dotenv").config({
  debug: true,
  path: path.join(path.dirname(__dirname), ".env"),
});
const fs = require("fs");
const { MongoClient } = require("mongodb");

const dbName = "fifa";
const collectionName = "stats";
const club = process.argv[2] || "FC Barcelona";
const outPath = path.join(__dirname, "player.json");

(async () => {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const player = await collection.findOne({ Club: club });
    if (!player) {
      console.error("No player found for club:", club);
      process.exitCode = 1;
      return;
    }
    delete player._id;
    fs.writeFileSync(outPath, JSON.stringify(player, null, 4), "utf8");
    console.log("JSON saved to", outPath);
  } catch (err) {
    console.error("Error:", err.message);
    process.exitCode = 2;
  } finally {
    try {
      await client.close();
    } catch (e) {}
  }
})();
