var router = require("express").Router();
const fs = require("fs");

const countries = JSON.parse(fs.readFileSync("./data/countries.json"));

router.get("/", (req, res) => {
  res.json(countries);
});

router.post("/list", (req, res) => {
  const list = req.body.countries;
  var countryList = [];
  for (const country of list) {
    if (countries[country.toLowerCase()])
      countryList.push(countries[country.toLowerCase()]);
  }
  res.json({
    countryList,
  });
});

module.exports = router;
