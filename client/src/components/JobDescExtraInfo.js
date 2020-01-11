import React from "react";
import "../style/job-description.css";

/**
 * @author: Osvaldo Carrillo
 * Date: 11/27/2019
 * This class is responsible for the sections displayed on
 * the desctiption page which is focus on the description content.
 */
export default class JobDescExtraInfo extends React.Component {
  render() {
    return (
      <div className="jobDesc-extraInfo">
        <div>
          <h2> {this.props.title}</h2>
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}
