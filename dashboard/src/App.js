import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

import Home from "./components/Home/Home";
import { Suspense } from "react";
// import ClubSpiderChart from "./components/SpiderChart/ClubSpiderChart";
// import FootPieChart from "./components/PieChart/FootPieChart";
// import ClubPositionBarChart from "./components/BarChart/ClubPositionBarChart";
// import ClubGeoViz from "./components/GeoViz/ClubGeoViz";

// const Home = React.lazy(() => import("./components/Home/Home"));
const ClubSpiderChart = React.lazy(() =>
  import("./components/SpiderChart/ClubSpiderChart")
);
const FootPieChart = React.lazy(() =>
  import("./components/PieChart/FootPieChart")
);
const ClubPositionBarChart = React.lazy(() =>
  import("./components/BarChart/ClubPositionBarChart")
);
const ClubGeoViz = React.lazy(() => import("./components/GeoViz/ClubGeoViz"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      teamName: "",
      teamLogo:
        "https://www.seekpng.com/png/full/28-289657_espn-soccer-team-logo-default.png",
    };
  }

  setTeam = (teamName, teamLogo) => {
    fetch("http://localhost:8080/club", {
      method: "POST",
      body: JSON.stringify({ club: teamName }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          fetched: true,
          players: json.club,
          teamName,
          teamLogo,
        });
      });
  };

  // componentDidMount() {
  //   console.log("test");
  //   fetch("http://localhost:8080/club", {
  //     method: "POST",
  //     body: JSON.stringify({ club: "Manchester United" }),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       this.setState({
  //         fetched: true,
  //         players: json.club,
  //         teamName: "Manchester United",
  //         teamLogo:
  //           "https://www.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
  //       });
  //     });
  // }

  render() {
    return (
      <section className="App">
        <Router>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
              {/* {this.state.teamName ? this.state.teamName : "Football"}  */}
              Football Manager Dashboard
              {/* {this.state.fetched === true || ( */}
              <img
                id="nav-logo"
                src={this.state.teamLogo}
                width="32px"
                alt="Team Logo"
              />
              {/* )} */}
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/viz1"
                  disabled={this.state.fetched === false}
                >
                  Spider Charts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/viz2"
                  disabled={this.state.fetched === false}
                >
                  Pie Chart
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/viz3"
                  disabled={this.state.fetched === false}
                >
                  Bar Chart
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/viz4"
                  disabled={this.state.fetched === false}
                >
                  Map Visualization
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <Route
            exact
            path="/"
            component={() => <Home setTeam={this.setTeam} />}
          />
          {/* <Route
            exact
            path="/selected"
            component={() => <div>Team selected</div>}
          /> */}
          <Route
            path="/viz1"
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <ClubSpiderChart
                  players={this.state.players}
                  fetched={this.state.fetched}
                  teamName={this.state.teamName}
                />
              </Suspense>
            )}
          />
          <Route
            path="/viz2"
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <FootPieChart
                  players={this.state.players}
                  fetched={this.state.fetched}
                  teamName={this.state.teamName}
                />
              </Suspense>
            )}
          />
          <Route
            path="/viz3"
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <ClubPositionBarChart
                  players={this.state.players}
                  fetched={this.state.fetched}
                  teamName={this.state.teamName}
                />
              </Suspense>
            )}
          />
          <Route
            path="/viz4"
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <ClubGeoViz
                  players={this.state.players}
                  fetched={this.state.fetched}
                  teamName={this.state.teamName}
                />
              </Suspense>
            )}
          />
        </Router>
      </section>
    );
  }
}

export default App;
