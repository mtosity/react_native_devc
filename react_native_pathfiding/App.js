import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import Box from "./Box";
bfs = require("./algorithms/bfs");

//const SH = Dimensions.get('window').height;
const SW = Dimensions.get("window").width - 10;

const size = SW / 10;

var defaultBoxes = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var defaultTitles = [
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""]
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: require("./boxes.json"),
      titles: require("./titles.json"),
      //0: none, 1: blocked, 2: start, 3: end
      haveStart: false,
      haveEnd: false,
      loading: false
    };
  }

  onPressBox = (index1, index2) => {
    boxes = [...this.state.boxes];
    titles = [...this.state.titles];
    boxes[index1][index2] = (boxes[index1][index2] + 1) % 4;

    let newTitle;
    if (boxes[index1][index2] === 2) {
      newTitle = "S";
    } else if (boxes[index1][index2] === 3) {
      newTitle = "E";
    } else {
      newTitle = "";
    }
    titles[index1][index2] = newTitle;
    this.setState({ titles });
    this.setState({ boxes });
    //console.log(titles);
    //console.log(this.state.boxes);
  };

  onLongPressBox = (index1, index2) => {
    boxes = [...this.state.boxes];
    titles = [...this.state.titles];
    boxes[index1][index2] = 0;
    titles[index1][index2] = "";
    //console.log(boxes)
    this.setState({ boxes, titles });
  };

  checkValid = () => {
    let haveStart, haveEnd;

    for (i = 0; i < this.state.boxes.length; i++) {
      for (j = 0; j < this.state.boxes.length; j++) {
        if (boxes[i][j] === 2) {
          if (haveStart) {
            return -2;
          } else {
            haveStart = true;
          }
        }
        if (boxes[i][j] === 3) {
          if (haveEnd) {
            return -3;
          } else {
            haveEnd = true;
          }
        }
      }
    }

    if (!haveEnd || !haveStart) {
      return -1;
    }
  };

  onStart = () => {
    const valid = this.checkValid();
    //console.log(valid)
    if (valid === -2) {
      alert("One start point only!");
    } else if (valid === -3) {
      alert("One end point only!");
    } else if (valid === -1) {
      alert("Please choose one start point and one end point!");
    } else {
      //start here
      //get start and end point
      this.setState({ loading: true });
      let start, end;

      this.state.boxes.forEach((boxes_1d, index1) => {
        boxes_1d.forEach((box, index2) => {
          if (box === 2) {
            start = { x: index1, y: index2, l: 1 };
          }
          if (box === 3) {
            end = { x: index1, y: index2, l: 0 };
          }
        });
      });
      //console.log(start, end);
      const result = bfs(start, end, this.state.boxes);
      if (result.length <= 0) {
        alert("There no way to the end point");
      } else {
        //show the result
        //console.log(result);

        boxes = [...this.state.boxes];
        titles = [...this.state.titles];

        let count = 1;
        result.forEach(r => {
          boxes[r.x][r.y] = -1;

          titles[r.x][r.y] = count.toString();
          count++;
        });
      }

      this.setState({ boxes });
      this.setState({ loading: false });
    }
  };

  onReset = () => {
    newBoxes = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    newTitles = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""]
    ];
    this.setState({ boxes: newBoxes });
    this.setState({ titles: newTitles });
  };

  onClearResult = () => {
    boxes = [...this.state.boxes];
    titles = [...this.state.titles];
    boxes.forEach((boxes_1d, index1) => {
      boxes_1d.forEach((box, index2) => {
        if (box === -1) {
          boxes[index1][index2] = 0;
          titles[index1][index2] = "";
        }
      });
    });

    this.setState({ boxes, titles });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ padding: 5 }}>
          {this.state.boxes.map((boxes_1d, index1) => {
            return (
              <View
                style={{
                  width: "100%",
                  heihgt: size,
                  flexDirection: "row"
                }}
                key={index1}
              >
                {boxes_1d.map((box, index2) => {
                  //console.log('object')
                  return (
                    <Box
                      key={index2}
                      size={size}
                      status={box}
                      title={this.state.titles[index1][index2]}
                      onPress={() => this.onPressBox(index1, index2)}
                      onLongPress={() => this.onLongPressBox(index1, index2)}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>

        {
        this.state.loading ? <Text>Loading</Text> :
        <View style={{width: '100%'}}>
          <View
            style={{ paddingHorizontal: 50, width: "100%", paddingTop: 20 }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "blue",
                paddingHorizontal: 30,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this.onStart}
            >
              <Text
                style={{ fontSize: 25, color: "white", fontWeight: "bold" }}
              >
                Start
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ paddingHorizontal: 50, width: "100%", paddingTop: 20 }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "blue",
                paddingHorizontal: 30,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this.onReset}
            >
              <Text
                style={{ fontSize: 25, color: "white", fontWeight: "bold" }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ paddingHorizontal: 50, width: "100%", paddingTop: 20 }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "blue",
                paddingHorizontal: 30,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this.onClearResult}
            >
              <Text
                style={{ fontSize: 25, color: "white", fontWeight: "bold" }}
              >
                Clear result
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        }
      </View>
    );
  }
}
