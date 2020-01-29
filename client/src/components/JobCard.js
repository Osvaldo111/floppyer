import React from "react";
import "../style/job-card.css";

/**
 * @author Osvaldo Carrillo
 * Date: 11/22/2019
 * This class contains the component "job card" which is responsible
 * of displaying the card with a brief description.
 */
export default class JobCard extends React.Component {
  render() {
    return (
      <div>
        <div className="job-card">
          <div className="job-card-information">
            <div className="job-card-sameLineInfo">
              <h2>{this.props.job_position}</h2>
              <p style={{ margin: "auto 0" }}>{this.props.date_posted}</p>
            </div>
            <h3>{this.props.company_name}</h3>
            <p>{this.props.job_hours}</p>
          </div>
        </div>
      </div>
    );
  }
}
