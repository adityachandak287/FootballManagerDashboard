import React, { Component } from "react";
// import { Route, NavLink, HashRouter } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import Header  from './components/common/HeaderComponent';
import Main from './components/MainComponent';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  
  render() {
    return (
      <section className="App">
        
        <Router>
          <Header />
          <Main />
        </Router>
      </section>
    );
  }
}

export default App;
