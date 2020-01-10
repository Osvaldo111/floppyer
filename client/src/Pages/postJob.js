import React from "react";
import "../style/form-post-job.css";
import NavigationBar from "../components/NavBar";

/**
 * @author Osvaldo Carrillo
 * Date: 11/27/2019
 * This class is responsible for displaying the form to
 * sent a job to the administrador.
 */
export default class PostJobForm extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />

        <div className="post-job-form-container">
          <form
            action="mailto:osvaldofabricio11@gmail.com"
            method="GET"
            className="post-job-form"
          >
            <h1 style={{ textAlign: "center" }}>Post a Job</h1>
            <label>Company Name (Required)</label>
            <input
              type="text"
              id="company"
              name="firstname"
              placeholder="Company.."
            />

            <label>Job Position (Required)</label>
            <input
              type="text"
              id="job"
              name="firstname"
              placeholder="Postion"
            />

            <label>Schedule (Required)</label>
            <input
              type="text"
              id="schedule"
              name="firstname"
              placeholder="Part-time, full-time, contract"
            />

            <label>URL or Email to apply (Required)</label>
            <input
              type="text"
              id="email"
              name="firstname"
              placeholder="Website our email.."
            />
            <div>
              <textarea
                id="subject"
                name="subject"
                placeholder="Write whatever you want.."
                style={{ height: "200px" }}
              ></textarea>
            </div>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
