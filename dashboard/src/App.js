import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home/Home";
import ClubSpiderChart from "./components/SpiderChart/ClubSpiderChart";
import FootPieChart from "./components/PieChart/FootPieChart";
import ClubPositionBarChart from "./components/BarChart/ClubPositionBarChart";

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      teamName: "",
    };
  }

  setTeam = (teamName, teamLogo) => {
    console.log("test");
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
  //     body: JSON.stringify({ club: this.state.teamName }),
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
  //       });
  //     });
  // }

  render() {
    return (
      <section className="App">
        <Router>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
              {this.state.fetched === true && (
                <img
                  id="nav-logo"
                  src={this.state.teamLogo}
                  width="30px"
                  alt="Team Logo"
                />
              )}
              {this.state.teamName ? this.state.teamName : "Football"} Manager
              Dashboard
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
            </Nav>
          </Navbar>
          <Route
            exact
            path="/"
            component={() => <Home setTeam={this.setTeam} />}
          />
          <Route
            path="/viz1"
            component={() => (
              <ClubSpiderChart
                players={this.state.players}
                fetched={this.state.fetched}
                teamName={this.state.teamName}
              />
            )}
          />
          <Route
            path="/viz2"
            component={() => (
              <FootPieChart
                players={this.state.players}
                fetched={this.state.fetched}
                teamName={this.state.teamName}
              />
            )}
          />
          <Route
            path="/viz3"
            component={() => (
              <ClubPositionBarChart
                players={this.state.players}
                fetched={this.state.fetched}
                teamName={this.state.teamName}
              />
            )}
          />
        </Router>
      </section>
    );
  }
}

export default App;
