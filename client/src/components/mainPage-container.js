import React from "react";
import "../style/main-container.css";
import JobsContaier from "./job-container";
import NavigationBar from "./nav-bar";
import SearchBox from "./search-box";
import { Link } from "react-router-dom";

/**
 * @author Osvaldo Carrillo.
 * Date: 11/21/2019.
 * This class is responsible of displaying all the elements
 * for the main page of the site. This class handles the funcionality
 * to hide the navigation bars both in desktop and mobile.
 */
export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "inline",
      hideBarInTopPage: "none"
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.displayNavBar);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.displayNavBar);
  }

  /**
   * This function is designed to avoid unnnecesary
   * re-render the navbar on the Parent Component.
   * @param {Object} newProps
   * @param {Object} newState
   */
  shouldComponentUpdate(newProps, newState) {
    return this.state.display !== newState.display;
  }

  displayNavBar = () => {
    var yAxisWindow = window.scrollY;
    var topMainImage = Math.round(document.documentElement.clientHeight * 0.55);
    if (yAxisWindow >= topMainImage) {
      this.setState({
        display: "flex",
        hideBarInTopPage: "flex"
      });
    }

    if (yAxisWindow <= topMainImage) {
      this.setState({ display: "none" });
    }
  };
  render() {
    return (
      <div className="container-mainPage">
        <div className="top-mainPage">
          <Link to="/postJob" className="btn-mainpage">
            <button className="button-main-page">Post Job</button>
          </Link>
          <div className="floppyer-mainpage">
            <span>floppyer</span>
            <p className="floppyer-text">
              We browse the web for you to get most of the jobs in the software
              Industry.
            </p>
          </div>
          <div className="searchBox-mainPage-wrapper">
            <div className="searchBox-mainPage-container">
              <SearchBox />
            </div>
          </div>
          <Link to="/postJob" className="btn-mainpage-bottom">
            <button className="button-main-page">Post Job</button>
          </Link>
        </div>
        <div className="display-nav" style={{ display: this.state.display }}>
          <NavigationBar hideNavBar={this.state.hideBarInTopPage} />
        </div>
        <div>
          <JobsContaier />
        </div>
      </div>
    );
  }
}
