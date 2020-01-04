import React from "react";

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
      disableButton: true
    };
  }

  storeJobsDatabase(url) {
    this.setState({ disableSubmit: true });
    fetch("/api/storeJobs", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ stackOverflowURL: url })
    })
      .then(result => {
        // Reset the errors
        this.setState({ errors: [] });
        return result.json();
      })
      .then(result => {
        // Store the errors and the status
        if (!result.status) {
          this.setState(prevState => ({
            errors: [...prevState.errors, result.error]
          }));
        }
        //Enable the button and store the status
        // which shoule e TRUE
        this.setState({ disableSubmit: false, isCompleted: result.status });
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
          </form>
        </div>
      </div>
    );
  }
}
