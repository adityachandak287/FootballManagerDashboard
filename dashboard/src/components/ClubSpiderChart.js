import React, { Component } from "react";
import PlayerSpiderChart from "./PlayerSpiderChart";

class ClubSpiderChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      teamName: this.props.teamName
    };
  }

  //   componentDidMount() {
  //     console.log("test");
  //     fetch("http://localhost:3000/club", {
  //       method: "POST",
  //       body: JSON.stringify({ club: this.state.teamName }),
  //       headers: {
  //         "Content-type": "application/json"
  //       }
  //     })
  //       .then(response => response.json())
  //       .then(json => {
  //         console.log(json);
  //         this.setState({
  //           fetched: true,
  //           players: json.club
  //         });
  //       });
  //   }

  componentDidMount() {
    this.setState({
      players: this.props.players,
      fetched: this.props.fetched
    });
  }

  render() {
    return (
      <div style={{ width: "100%" }} className="container text-center">
        <h3>{"Spider Charts for " + this.props.teamName}</h3>

        <div style={{ display: "inline-block" }}>
          {this.props.fetched === true && this.state.players ? (
            this.state.players.map((currPlayer, index) => (
              <PlayerSpiderChart player={currPlayer} key={index} />
            ))
          ) : (
            <PlayerSpiderChart player={{ Name: "Player Name", Overall: "" }} />
          )}
        </div>
      </div>
    );
  }
}

export default ClubSpiderChart;
