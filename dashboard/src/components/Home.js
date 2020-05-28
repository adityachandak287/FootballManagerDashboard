import React, { Component } from "react";
import { Card, CardTitle, CardImg, CardBody } from "reactstrap";

function selectTeam(e) {
  console.log(e.target);
}

const ClubTile = ({ name, logo }) => {
  return (
    <div className="col-12 col-md-2">
      <Card className="teamCard" value={name} onClick={selectTeam}>
        <CardImg src={logo} width="100%" height="auto" alt="Club Logo" />
        <CardBody>
          <CardTitle> {name} </CardTitle>
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
    };
  }
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
    console.log(this.props.fetched);
    return (
      <div className="container">
        <div className="row">
          {this.state.fetched === true
            ? this.state.clubs.map((club, index) => (
                <ClubTile
                  name={club.teamName}
                  logo={club.teamLogo}
                  key={index}
                />
              ))
            : "Loading Clubs..."}
        </div>
      </div>
    );
  }
}

export default Home;
