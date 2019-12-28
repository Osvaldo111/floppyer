import React from "react";
import "../style/search-box.css";
import { connect } from "react-redux";
import { setSearchBoxData } from "../actions";
/**
 * @author Osvaldo Carrillo
 * Date: 11/21/19.
 * This class contains the component "Search Box".
 */

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobEntered: ""
    };
  }

  getSearchBoxInput = event => {
    this.setState({ jobEntered: event.target.value });
  };

  handleSubmit = event => {
    // Store the function in the reducer
    this.props.setSearchBoxData(this.state.jobEntered);
    event.preventDefault();
  };

  render() {
    return (
      <div className="form-container">
        <form
          action=""
          className="input-container"
          onSubmit={this.handleSubmit}
        >
          <input
            className="search-box"
            type="text"
            placeholder="Search something"
            value={this.state.jobEntered}
            onChange={this.getSearchBoxInput}
          />
          <input type="submit" value="" className="search-box-icon"></input>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setSearchBoxData
};
export default connect(null, mapDispatchToProps)(SearchBox);
