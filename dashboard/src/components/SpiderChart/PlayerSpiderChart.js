import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

class PlayerSpiderChart extends Component {
  constructor(props) {
    super(props);

    const defaultAttributeNames = [
      "Overall",
      "Acceleration",
      "Agility",
      "BallControl",
      "Finishing",
      "Positioning",
      "Reactions",
      "Stamina",
    ];

    const deafaultAttributeValues = defaultAttributeNames.map((attrName) => {
      if (this.props.player) return parseInt(this.props.player[attrName]);
      else return 0;
    });

    this.state = {
      fetched: false,
      chartData: {
        labels: defaultAttributeNames,
        datasets: [
          {
            label: this.props.player.Name,
            data: deafaultAttributeValues,
            backgroundColor: this.getRandomColor(),
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
    return (
      <div
        // className="col-12 col-md-3"
        style={{ width: "30%", height: "400px", display: "inline-block" }}
        className="container"
      >
        <Radar
          data={this.state.chartData}
          // width={"100%"}
          // height={"100%"}
          options={{
            maintainAspectRatio: false,
            scale: {
              angleLines: {
                display: false,
              },
              gridLines: {},
              ticks: {
                min: 0,
                max: 100,
                stepSize: 10,
              },
            },
          }}
        />
      </div>
    );
  }
}

export default PlayerSpiderChart;
