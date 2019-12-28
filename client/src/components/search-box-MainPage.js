import React from "react";
import "../style/search-box-MainPage.css";
import SearchBox from "./search-box";
import { connect } from "react-redux";
import { setCheckBoxValue } from "../actions";
/**
 * @author Osvaldo Carrillo.
 * Date: 11/21/2019
 * This class contains the "Search Box" and "Filter by County" sections
 * that are display on the main page of the site.
 */
class SearchBoxContainer extends React.Component {
  /**
   * Avoid unnnecesary re-render because of the
   * parent scrolling funcitons.
   */
  shouldComponentUpdate() {
    return false;
  }

  // Use the reducer to set the value of the checkbox
  handleChange = event => {
    this.props.setCheckBoxValue(event.target.checked);
  };

  render() {
    return (
      <div className="search-container">
        <SearchBox />
        <div className="filter-country">
          <h1>Filter</h1>
          <div className="filter-country-container">
            <div>
              <input
                type="checkbox"
                id="checkBoxAllJobs"
                name="AllJobs"
                value="All"
                onChange={this.handleChange}
              />
              <label htmlFor="US">All Jobs</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCheckBoxValue
};

export default connect(null, mapDispatchToProps)(SearchBoxContainer);
