import React from "react";
import { setSearchBoxData } from "../actions";
import { connect } from "react-redux";
import "../style/dataSearchBox.css";
/**
 * @author Osvaldo Carrillo
 * Date: 12/30/2019
 * This class is designed to display the data the
 * user entered in the search box, and also this
 * should create a button enabling the user
 * to remove the data entered.
 */
class DataEnteredDisplay extends React.Component {
  // Reset the reducer when the user removed
  // the keyword previously entered.
  removeData = () => {
    this.props.setSearchBoxData("");
  };
  render() {
    return (
      <div>
        <div className="dataSearchBox-wrapper">
          <p>{this.props.searchBoxData === "" ? "All the jobs" : ""}</p>
          <p>{this.props.searchBoxData !== "" ? "Jobs Releted" : ""}</p>
          {this.props.searchBoxData === "" ? (
            ""
          ) : (
            <button onClick={this.removeData} className="dataSearchBox-btn">
              <p>{this.props.searchBoxData}</p>
              <span className="dataSearchBox-close">&times;</span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchBoxData: state.searchBox.searchBoxData
  };
}
const mapDispatchToProps = {
  setSearchBoxData
};
export default connect(mapStateToProps, mapDispatchToProps)(DataEnteredDisplay);
