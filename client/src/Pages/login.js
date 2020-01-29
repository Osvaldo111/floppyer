import React from "react";
import { Redirect } from "react-router-dom";
import { Example } from "../components/JobCard";
import { ServerError } from "../components/ServerError500";

/**
 * @author Osvaldo Carrillo
 * Date: 14/14/19
 * This class is the login page for the
 * administrador.
 */

export default class LoginAdministrador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isSigned: null,
      wrongCredentials: false,
      loadingResponse: false,
      isServerError500: false
    };
  }

  componentDidMount() {
    //Check the authorization for cookies
    this.getAuthorization();
  }

  getUsernameCredentials = event => {
    this.setState({ username: event.target.value });
  };

  getPasswordCredentials = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmission = event => {
    var userCredentials = {
      username: this.state.username,
      password: this.state.password
    };
    this.getApprovalForLogin(userCredentials);

    event.preventDefault();
  };

  getApprovalForLogin = credentials => {
    this.setState({ loadingResponse: true }, () => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ credentials: credentials })
      })
        .then(result => {
          if (result.status === 500) {
            throw new Error(result.status);
          }
          return result.json();
        })
        .then(result => {
          // Reseting the variables
          this.setState({
            loadingResponse: false,
            wrongCredentials: false,
            isServerError500: false
          });
          return result;
        })
        .then(result => {
          if (result) {
            this.setState({ isSigned: result });
          }
          this.setState({ wrongCredentials: true });
        })
        .catch(error => {
          this.setState({
            isServerError500: true,
            loadingResponse: false,
            wrongCredentials: false
          });
        });
    });
  };
  /**
   * Check if the user is already logged
   * with cookies
   */
  getAuthorization = () => {
    fetch("/api/auth", {
      method: "POST"
    })
      .then(result => result.json())
      .then(result => {
        this.setState({ isSigned: result });
      });
  };
  render() {
    const { loadingResponse } = this.state;
    const { isServerError500 } = this.state;
    const { wrongCredentials } = this.state;

    if (this.state.isSigned) {
      return <Redirect to={"/storeJobsDB"} />;
    }
    return (
      <div>
        <div className="post-job-form-container">
          <form
            action=""
            className="post-job-form"
            onSubmit={this.handleSubmission}
          >
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <label>User Name (Required)</label>
            <input
              type="text"
              id="username"
              name="firstname"
              placeholder="Company.."
              onChange={this.getUsernameCredentials}
              value={this.state.username}
              required
            />
            <label>Password (Required)</label>
            <input
              type="text"
              id="password"
              name="firstname"
              placeholder="Postion"
              onChange={this.getPasswordCredentials}
              value={this.state.password}
              required
            />
            <input type="submit" value="Submit" />
            <p>{loadingResponse ? "Loading...." : ""}</p>
            <p>{isServerError500 ? "Server Error 500" : ""}</p>
            <p>{wrongCredentials ? "Wrong Credentials" : ""}</p>
          </form>
        </div>
      </div>
    );
  }
}
