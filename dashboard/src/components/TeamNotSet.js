import React from "react";
import { Jumbotron, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
export default function TeamNotSet() {
  return (
    <div>
      <Jumbotron className="text-center">
        <h1 className="display-3">Team not set!</h1>
        <p>Please select a team on the home page.</p>
        <NavLink tag={"a"} to="/">
          Go to Homepage
        </NavLink>
      </Jumbotron>
    </div>
  );
}
