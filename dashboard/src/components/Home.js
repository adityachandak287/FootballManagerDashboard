import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardImg,
  CardBody
} from 'reactstrap';
import { Link } from "react-router-dom";

const ClubTile = ({name, logo}) => {
  return(
    <div className="col-12 col-md-2">
      <Link to={`/club/${name}`} >
        <Card>
            <CardImg src={logo} alt="Club Logo" />
            <CardBody>
              <CardTitle> {name} </CardTitle>
            </CardBody>
        </Card>
      </Link>
    </div>
  )
}
class Home extends Component {
  render() {
    console.log(this.props.fetched);
    return (
      <div className="container">
        <div className="row">
          {
            this.props.fetched ?
              this.props.clubs.map(club => <ClubTile name={club.name} logo={club.logo} />)
            : 
              "Loading Clubs"
          }
        </div>
      </div>
    );
  }
}

export default Home;
