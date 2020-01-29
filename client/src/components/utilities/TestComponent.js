import React from "react";
import { connect } from "react-redux";

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exampleOne: "Example1",
      exampleTwo: "Example2"
    };
  }

  componentDidMount() {
    fetch("/api/getJobs", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        keyword: "Hello"
      })
    }).then(result => {
      console.log(result);
      this.setState({ exampleOne: result });
    });
  }

  someFunction() {
    return "Hello";
  }

  render() {
    const { exampleOne } = this.state;
    const { exampleTwo } = this.state;
    if (exampleOne === "test")
      return (
        <div>
          <p>Test Pass Fetch Mock Data</p>
        </div>
      );
    return (
      <div>
        <p>{exampleTwo}</p>
        <p>{exampleOne}</p>
      </div>
    );
  }
}

export default connect()(TestComponent);
