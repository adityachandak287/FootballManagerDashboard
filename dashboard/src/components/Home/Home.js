import React, { Component } from "react";
import { Card, CardTitle, CardImg, CardBody } from "reactstrap";
import "./Home.css";

const ClubTile = (props) => {
  return (
    <div className="col-12 col-md-2">
      <Card
        className="teamCard"
        value={props.name}
        onClick={() => props.selectTeam(props.name, props.logo)}
      >
        <CardImg src={props.logo} width="100%" height="auto" alt="Club Logo" />
        <CardBody>
          <CardTitle> {props.name} </CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      selected: "",
    };
  }

  selectTeam = (teamName, teamLogo) => {
    console.log(teamName);
    this.props.setTeam(teamName, teamLogo);
    this.setState(
      {
        selected: teamName,
      },
      () => console.log(this.state.selected)
    );
  };

  componentDidMount() {
    fetch("http://localhost:8080/clubNames", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          clubs: response.clubNames.filter(
            (club) => club.teamLogo.search("thesportsdb.com") !== -1
          ),
          fetched: true,
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.fetched === true
            ? this.state.clubs.map((club, index) => (
                <ClubTile
                  name={club.teamName}
                  logo={club.teamLogo}
                  key={index}
                  selectTeam={this.selectTeam}
                />
              ))
            : "Loading Clubs..."}
        </div>
      </div>
    );
  }
}

export default Home;
