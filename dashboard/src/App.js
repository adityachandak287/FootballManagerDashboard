import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Stuff from "./components/Stuff";
import Contact from "./components/Contact";
import ClubSpiderChart from "./components/ClubSpiderChart";
import FootPieChart from "./components/FootPieChart";
import ClubPositionBarChart from "./components/ClubPositionBarChart";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      teamName: "Manchester United",
    };
  }

  componentDidMount() {
    console.log("test");
    fetch("http://localhost:8080/club", {
      method: "POST",
      body: JSON.stringify({ club: this.state.teamName }),
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
        });
      });
  }

  render() {
    return (
      <section className="App">
        <Router>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Football Manager Dashboard</NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/viz1">
                  Spider Charts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/viz2">
                  Pie Charts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/viz3">
                  Bar Charts
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          {/* <Link to="/">Home</Link>
          <Link to="/viz1">Spider Charts</Link>
          <Link to="/viz2">Pie Charts</Link>
          <Link to="/stuff">Stuff</Link>
          <Link to="/contact">Contact</Link> */}
          <Route exact path="/" component={Home} />
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
          <Route path="/stuff" component={Stuff} />
          <Route path="/contact" component={Contact} />
        </Router>
      </section>
    );
  }
}

export default App;
