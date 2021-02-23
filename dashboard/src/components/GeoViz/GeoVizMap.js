import React, { Component } from "react";
import {
  Map,
  // Marker,
  CircleMarker,
  Popup,
  TileLayer,
} from "react-leaflet";
import "./GeoVizMap.css";

const CountryMarker = (props) => {
  const { code, country, lat, lon, players } = props.country;
  const markerPosition = [parseFloat(lat), parseFloat(lon)];

  return (
    <CircleMarker
      center={markerPosition}
      radius={players.length * 8}
      color={getColour(players.length)}
      weight={2}
    >
      <Popup>
        <h5>
          <strong>
            {country} ({code})
          </strong>
        </h5>
        <h6>{players.length} player(s)</h6>
        {players.map((player, index) => (
          <p className="h6" key={index}>
            {player}
          </p>
        ))}
      </Popup>
    </CircleMarker>
  );
};

const getColour = (numPlayers) => {
  const colours = ["#ffffff", "#fcf403", "#fc6f03", "#e02500", "#b00000"];
  return colours[Math.min(colours.length - 1, numPlayers - 1)];
};

export default class GeoVizMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      zoom: 2,
      calculated: true,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.props.countries.length !== 0 &&
          this.props.countries.map((country, index) => (
            <CountryMarker key={index} country={country} />
          ))}
      </Map>
    );
  }
}
