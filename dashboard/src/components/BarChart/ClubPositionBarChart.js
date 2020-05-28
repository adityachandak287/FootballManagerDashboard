import React, { Component } from "react";
import { Bar, HorizontalBar } from "react-chartjs-2";
import { ChartHeader, TeamNotSet } from "../Utils";

class ClubPositionBarChart extends Component {
  constructor(props) {
    super(props);

    let positions = {};

    if (this.props.fetched === true) {
      console.log(this.props.players);
      this.props.players.forEach((player) => {
        let temp = player["Position"];

        if (Object.keys(positions).indexOf(temp) !== -1)
          positions[player["Position"]] += 1;
        else positions[player["Position"]] = 1;
      });
    }

    const bgColors = Object.keys(positions).map((position) =>
      this.getRandomColor()
    );

    this.state = {
      fetched: false,
      chartData: {
        labels: Object.keys(positions),
        datasets: [
          {
            label: "Position distribution using Bar Chart",
            data: Object.values(positions),
            minBarLength: 20,
            backgroundColor: bgColors,
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
      ",0.85)"
    );
  }

  render() {
    return this.props.fetched === true ? (
      <div className="container">
        <ChartHeader chartType="Bar" teamName={this.props.teamName} />
        <HorizontalBar
          data={this.state.chartData}
          // width={"60vw"}
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  display: true,
                  ticks: {
                    beginAtZero: true, // minimum value will be 0.
                  },
                },
              ],
            },
          }}
        />
      </div>
    ) : (
      <TeamNotSet />
    );
  }
}

export default ClubPositionBarChart;
