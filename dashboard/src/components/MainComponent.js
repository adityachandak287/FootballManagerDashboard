import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import ClubSpiderChart from "./ClubSpiderChart";
import Stuff from "./Stuff";
import Contact from "./Contact";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fetchedCN: false,
          clubNames: [],
        };
      }
    
      componentDidMount (){

        fetch('http://localhost:3000/clubNames', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                clubNames: response.clubNames,
                fetchedCN: true
            })
        });
      }
        
    render(){
        return(
            <div>
                <Switch>
                    <Route 
                        exact 
                        path="/home" 
                        component={() => (
                            <Home 
                                fetched={this.state.fetchedCN}
                                clubs={this.state.clubNames}
                            />
                        )} 
                    />
                    <Route
                        path="/club/:name"
                        component={(props) => {
                            console.log(props)
                            return(
                            <ClubSpiderChart
                                teamName={props.match.params.name}
                            />
                        )}}
                        />
                    <Route path="/stuff" component={Stuff} />
                    <Route path="/contact" component={Contact} />
                </Switch>
            </div>
        )
    };
};

export default Main;