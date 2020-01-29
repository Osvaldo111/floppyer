import React from "react";
import "../style/nav-bar.css";
import { Link } from "react-router-dom";
/**
 * @author Osvaldo Carrillo
 * Date: 11/25/2019
 * This class is responsible of displaying the navigation
 * bar.
 */

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none"
    };
  }

  displayMobileNavBar = () => {
    if (this.state.display === "none") {
      this.setState({ display: "inline" });
    } else {
      this.setState({ display: "none" });
    }
  };

  render() {
    return (
      <div
        className="navBar-wrapper"
        style={{ display: this.props.hideNavBar }}
      >
        <div className="navigation-bar">
          <Link to="/" className="navbar-floppyer">
            <span data-testid="title">floppyer</span>
            {/* <img className="navbar-logo" src={logo} alt="navbar-logo"></img> */}
          </Link>
          <Link to="/postJob" className="navbar-btn-wrapper">
            <button className="button-main-page">Post Job</button>
          </Link>
          <div className="navbar-ham-btn-wrapper">
            <button
              className="navbar-mobile-button"
              onClick={this.displayMobileNavBar}
            ></button>
          </div>
        </div>
        <div
          className="navbar-mobile-button-options"
          style={{ display: this.state.display }}
        >
          <div className="navbar-mobile-btn-wrapper">
            <Link to="/postJob">
              <p>Post Job</p>
            </Link>
          </div>
          <div className="navbar-mobile-btn-wrapper">
            <Link to="/">
              <p>Home</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
