const fetch = require("node-fetch");
const fs = require("fs");

const URL = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=";

getTeamLogos = async () => {
  let rawData = fs.readFileSync("teamLogos.json");
  let teamsData = JSON.parse(rawData);
  const res = await fetch("http://localhost:8080/clubNames");
  const jsonData = await res.json();
  console.log(jsonData.clubNames.length);
  const increment = 10;
  for (let i = 0; i < jsonData.clubNames.length; i += increment) {
    for (const team of jsonData.clubNames.slice(i, i + increment)) {
      if (!(team.name in teamsData)) {
        try {
          const resData = await fetch(encodeURI(URL + team.name));
          const resJSON = await resData.json();
          let msg = { name: team.name, method: "" };
          // console.log(`Fetched ${team.name}`);
          if (resJSON.teams) {
            const teamInfo = {
              teamName: team.name,
              teamLogo: resJSON.teams[0].strTeamBadge,
            };
            teamsData[team.name] = teamInfo;
            msg.method = "sportsDB";
          } else {
            const teamInfo = {
              teamName: team.name,
              teamLogo: team.logo,
            };
            teamsData[team.name] = teamInfo;
            msg.method = "fifaDB";
          }
          console.log(msg);
        } catch (e) {
          const fileData = fs.readFileSync("errors.json");
          let errorData = JSON.parse(fileData);
          errorData.push({
            teamName: team.name,
            error: e,
          });
          fs.writeFileSync("errors.json", JSON.stringify(errorData, null, 4));
        } finally {
          await sleep(500);
        }
      }
    }
    // console.log(`Fetched ${increment} teams`);
    console.log(`Number of teams = ${Object.keys(teamsData).length}`);
    // fs.writeFileSync("errors.json", JSON.stringify(errorData, null, 4));
    fs.writeFileSync("teamLogos.json", JSON.stringify(teamsData, null, 4));
  }
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

getTeamLogos();
