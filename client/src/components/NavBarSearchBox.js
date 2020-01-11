import React from "react";
import "../style/nav-bar-search-box.css";

/**
 * @author Osvaldo Carrillo
 * Date: 11/21/19.
 * This class contains the component "Search Box".
 */
export default class NavBarSearchBox extends React.Component {
  render() {
    return (
      <div className="form-container-navBar">
        <form action="">
          <input
            className="search-box-navBar"
            type="text"
            placeholder="Search something"
          />
        </form>
      </div>
    );
  }
}
