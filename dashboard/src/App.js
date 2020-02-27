import React, { Component } from "react";
// import { Route, NavLink, HashRouter } from "react-router-dom";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Stuff from "./components/Stuff";
import Contact from "./components/Contact";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClubSpiderChart from "./components/ClubSpiderChart";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      teamName: "FC Barcelona"
    };
  }

  componentDidMount() {
    console.log("test");
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
          players: json.club
        });
      });
  }

  render() {
    return (
      <section className="App">
        <Router>
          <Link to="/">Home</Link>
          <Link to="/viz1">Viz 1</Link>
          <Link to="/stuff">Stuff</Link>
          <Link to="/contact">Contact</Link>
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
          <Route path="/stuff" component={Stuff} />
          <Route path="/contact" component={Contact} />
        </Router>
      </section>
    );
  }
}

export default App;
