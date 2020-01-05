import React from "react";
import { ServerErrors, ServerError } from "./serverError500";
/**
 * @author Osvaldo Carrillo
 * Date: 12/25/2019
 * This class is designed to be the form to fetch
 * the StackOverflow RSS URL into the database with
 * the help of the API
 */
export default class InsertJobsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stackOverflowURL: "",
      errors: [],
      disableSubmit: false,
      isCompleted: false,
      loadingResult: false
    };
  }

  storeJobsDatabase(url) {
    this.setState({ disableSubmit: true, loadingResult: true }, () => {
      fetch("/api/storeJobs", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ stackOverflowURL: url })
      })
        .then(result => {
          this.setState({ errors: [], loadingResult: false });
          if (result.status === 500) {
            throw new Error(result.status);
          } else {
            // Reset the errors
            return result.json();
          }
        })
        .then(result => {
          console.log("The Status", this.state.errors.length);
          if (result.error) this.setState({ errors: [result.error] });
          //Enable the button and store the status
          // which shoule e TRUE
          this.setState({ disableSubmit: false, isCompleted: result.success });
        })
        .catch(error => {
          this.setState({ errors: ["Server Error"], disableSubmit: false });
        });
    });
  }
  getStackOverflowURL = event => {
    this.setState({ stackOverflowURL: event.target.value });
  };
  handleSubmission = event => {
    var urlLink = this.state.stackOverflowURL;
    /**
     * OPTIONAL Validation
     * This is in case you don't want to
     * use "required" in the HTML tag
     */
    //Reset the state "errors" and "isCompleted"
    this.setState({ errors: [], isCompleted: false });

    // Checl if URL is provided
    if (urlLink.length === 0) {
      this.setState(prevState => ({
        errors: [...prevState.errors, "Please, Enter the URL"]
      }));
    } else {
      this.storeJobsDatabase(urlLink);
    }

    event.preventDefault();
  };
  render() {
    const errors = this.state.errors;
    const { loadingResult } = this.state;
    return (
      <div>
        <div className="post-job-form-container">
          <form
            action=""
            className="post-job-form"
            onSubmit={this.handleSubmission}
          >
            <h1 style={{ textAlign: "center" }}>
              Insert Jobs into the Database
            </h1>
            <label>StackOverflow URL RSS (Required)</label>
            <input
              type="text"
              id="stackOverflowURL"
              name=""
              placeholder="StackOverflow RSS URL .."
              onChange={this.getStackOverflowURL}
              value={this.state.stackOverflowURL}
            />
            <input
              type="submit"
              value="Submit"
              disabled={this.state.disableSubmit}
              style={{
                backgroundColor: this.state.disableSubmit ? "white" : ""
              }}
            />
            <p>{errors.length === 0 ? "" : "Check this, please: "}</p>
            {errors.map(error => (
              <p key={error}>{error}</p>
            ))}
            <p>{this.state.isCompleted ? "The Process is Completed!" : ""}</p>
            <p>{this.state.loadingResult ? "Loading...." : ""}</p>
          </form>
        </div>
      </div>
    );
  }
}
