import React, { Component } from "react";
import GeoVizMap from "./GeoVizMap";
import { TeamNotSet } from "../Utils";
import "./GeoVizMap.css";

export default class ClubGeoViz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedCoordinates: false,
    };
  }

  componentDidMount() {
    var playersByCountry = {};
    if (this.props.fetched === true) {
      for (const player of this.props.players) {
        const lowerCaseCountry = player.Nationality.toLowerCase();
        if (playersByCountry[lowerCaseCountry]) {
          playersByCountry[lowerCaseCountry].push(player.Name);
        } else {
          playersByCountry[lowerCaseCountry] = [player.Name];
        }
      }
    }

    fetch("http://localhost:8080/countries/list", {
      method: "POST",
      body: JSON.stringify({ countries: Object.keys(playersByCountry) }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json["countryList"]) {
          for (var country of json.countryList) {
            country["players"] =
              playersByCountry[country.country.toLowerCase()];
          }
        }
        this.setState({
          fetchedCoordinates: true,
          countries: json.countryList,
        });
      });
  }
  render() {
    return this.props.fetched === true ? (
      this.state.fetchedCoordinates ? (
        <GeoVizMap countries={this.state.countries} />
      ) : (
        <div>Loading Map...</div>
      )
    ) : (
      <TeamNotSet />
    );
  }
}
