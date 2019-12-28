import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { connect } from "react-redux";
import { checkAdminLogout } from "../actions";
/**
 * @author Osvaldo Carrillo
 * Date: 12/19/2019
 * This class is responsible of displaying the navigation
 * bar for the Adminstrador.
 */

class NavigationBar extends React.Component {
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
          <Link to="/">
            <img className="navbar-logo" src={logo} alt="navbar-logo"></img>
          </Link>
          {/* <div className="navbar-search-box"> <NavBarSearchBox /></div> */}

          <button
            className="button-main-page"
            onClick={() => this.props.checkAdminLogout(true)}
          >
            Log Out
          </button>

          <button
            className="navbar-mobile-button"
            onClick={this.displayMobileNavBar}
          ></button>
        </div>
        <div
          className="navbar-mobile-button-options"
          style={{ display: this.state.display }}
        >
          {/* <div className="navbar-mobile-searchContainer">
             <div>
              <NavBarSearchBox />
            </div> 
          </div> */}
          <div className="navbar-mobile-btn-wrapper">
            <p onClick={() => this.props.checkAdminLogout(true)}>Log Out</p>
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

const mapDispatchToProps = {
  checkAdminLogout
};
export default connect(null, mapDispatchToProps)(NavigationBar);
