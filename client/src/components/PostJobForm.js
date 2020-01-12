import React from "react";
import "../style/form-post-job.css";
import NavigationBar from "../components/NavBar";
import fetchAPI from "../http/fetch";

/**
 * @author Osvaldo Carrillo
 * Date: 11/27/2019
 * This class is responsible for displaying the form to
 * sent a job to the administrador.
 */
export default class PostJobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      jobPosition: "",
      schedule: "",
      contact: "",
      comments: "",
      isError500: false,
      loading: false,
      isCompleted: false
    };
  }

  /**
   * Get the values from the form
   */
  getCompanyName = event => {
    this.setState({ companyName: event.target.value });
  };
  getJobPosition = event => {
    this.setState({ jobPosition: event.target.value });
  };
  getSchedule = event => {
    this.setState({ schedule: event.target.value });
  };
  getContact = event => {
    this.setState({ contact: event.target.value });
  };
  getComments = event => {
    this.setState({ comments: event.target.value });
  };

  handleSubmit = event => {
    this.sendData();
    event.preventDefault();
  };

  /**
   * Send Data to the Server
   */
  sendData = () => {
    const data = {
      companyName: this.state.companyName,
      jobPosition: this.state.jobPosition,
      schedule: this.state.schedule,
      contact: this.state.contact,
      comments: this.state.comments
    };
    this.setState({ loading: true, isCompleted: false }, () => {
      fetchAPI("/postJob", data)
        .then(result => {
          if (result.status === 500) throw new Error(result.status);
          return result.json();
        })
        .then(result => {
          console.log("Hello", result);
          this.setState({
            loading: false,
            isError500: false,
            isCompleted: true
          });
        })
        .catch(error => {
          this.setState({ isError500: true, loading: false });
        });
    });
  };

  render() {
    const { isError500 } = this.state;
    const { loading } = this.state;
    const { isCompleted } = this.state;
    return (
      <div>
        <NavigationBar />

        <div className="post-job-form-container">
          <form
            action="mailto:osvaldofabricio11@gmail.com"
            method="GET"
            className="post-job-form"
            onSubmit={this.handleSubmit}
          >
            <h1 style={{ textAlign: "center" }}>Post a Job</h1>
            <label>Company Name (Required)</label>
            <input
              type="text"
              id="company"
              name="firstname"
              placeholder="Company.."
              onChange={this.getCompanyName}
              required
            />

            <label>Job Position (Required)</label>
            <input
              type="text"
              id="job"
              name="firstname"
              placeholder="Postion"
              onChange={this.getJobPosition}
              required
            />

            <label>
              Schedule "Full-Time / Part-Time / Contract" (Required)
            </label>
            <input
              type="text"
              id="schedule"
              name="firstname"
              placeholder="Part-time, full-time, contract"
              onChange={this.getSchedule}
              required
            />

            <label>URL or Email to apply (Required)</label>
            <input
              type="text"
              id="email"
              name="firstname"
              placeholder="Website our email.."
              onChange={this.getContact}
              required
            />
            <div>
              <textarea
                id="subject"
                name="subject"
                placeholder="Write whatever you want.."
                style={{ height: "200px" }}
                onChange={this.getComments}
                required
              ></textarea>
            </div>

            <input type="submit" value="Submit" />
            <p>{isError500 ? "Error Server" : ""}</p>
            <p>{loading ? "Loading..." : ""}</p>
            <p>{isCompleted ? "Completed!" : ""}</p>
          </form>
        </div>
      </div>
    );
  }
}
