import React, { Component } from "react";
import PlayerSpiderChart from "./PlayerSpiderChart";

class ClubSpiderChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      teamName: this.props.teamName,
      players: null
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
    fetch("http://localhost:3000/club", {
      method: "POST",
      body: JSON.stringify({ club: this.state.teamName }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
            fetched: true,
            players: json.club,
        })
      })
      .catch(error => {
        console.error("Error Fetching Players " + error)
      }) 
 
  }

  render() {
    
    return (
      <div style={{ width: "100%" }} className="container text-center">
        <h3>{"Spider Charts for " + this.props.teamName}</h3>
        {
          this.state.fetched 
          ? <div style={{ display: "inline-block" }}>
              {this.state.fetched === true && this.state.players ? (
                this.state.players.map((currPlayer, index) => (
                  <PlayerSpiderChart player={currPlayer} key={index} />
                ))
              ) : (
                <PlayerSpiderChart player={{ Name: "Player Name", Overall: "" }} />
              )}
            </div>
          : "Fetching Players"    
        }
        </div>
    );
  }
}

export default ClubSpiderChart;
