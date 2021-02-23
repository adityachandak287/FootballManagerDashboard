import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import {
  ChartHeader,
  // TeamNotSet
} from "../Utils";
import { Redirect } from "react-router-dom";

class FootPieChart extends Component {
  constructor(props) {
    super(props);

    const footPrefs = { Left: 0, Right: 0 };

    if (this.props.fetched === true) {
      console.log(this.props.players);
      this.props.players.forEach((player) => {
        let temp = 0;
        if (player) temp = 1;
        footPrefs[player["Preferred Foot"]] += temp;
      });
    }

    this.state = {
      fetched: false,
      chartData: {
        labels: ["Left", "Right"],
        datasets: [
          {
            label: "Preferred Foot",
            data: [footPrefs.Left, footPrefs.Right],
            backgroundColor: ["rgba(139, 0, 0, 0.75)", "rgba(0, 0, 128, 0.75)"],
          },
        ],
      },
    };
  }

  getRandomColor() {
    return (
      "rgba(" +
      parseInt(Math.random() * 255) +
      ", " +
      parseInt(Math.random() * 255) +
      "," +
      parseInt(Math.random() * 255) +
      ",0.5)"
    );
  }

  render() {
    return this.props.fetched === true ? (
      <div className="container">
        <ChartHeader chartType="Pie" teamName={this.props.teamName} />
        <Pie
          data={this.state.chartData}
          //   width={60%}
          height={400}
          options={{
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
            },
          }}
        />
      </div>
    ) : (
      // <TeamNotSet />
      <Redirect to="/" />
    );
  }
}

export default FootPieChart;
