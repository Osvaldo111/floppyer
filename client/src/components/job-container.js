import React from "react";
import JobCard from "./job-card";
import "../style/card-container.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setSearchBoxData } from "../actions";
import DataEnteredDisplay from "./dataSearchBox";
import moment from "moment"; // Use this module to format the date
/**
 * @author Osvaldo Carrillo
 * Date: 22/11/2019
 * This class is a component which is responsible of containing all
 * the job cards and display them in the main page.
 */
const DISPLAY_NUM_JOBS = 12;
class JobsContaier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      offsetIndex: 0,
      disabledLoadBtn: false,
      loading: true
    };
  }

  componentDidMount() {
    // Initialize with the current value of the
    // "Search Box Data"
    this.getJobDescription(this.props.searchBoxData);
  }

  /**
   * This function is designed to update the job list
   * when the "SearchBoxData" have been changed. Or onw of the
   * parameters of the filter is selected.
   * @param {Object} previousProps
   * @param {Object} previouState
   */
  componentDidUpdate(previousProps, previouState) {
    // Check if the user has entered a new value on the search bar.
    if (previousProps.searchBoxData !== this.props.searchBoxData) {
      this.setState(
        {
          list: [],
          offsetIndex: 0
        },
        () => {
          this.getJobDescription(this.props.searchBoxData);
        }
      );
    }
  }

  getJobDescription = param => {
    fetch("/api/getJobs", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        keyword: param,
        offsetIndex: this.state.offsetIndex,
        numJobs: DISPLAY_NUM_JOBS
      })
    })
      .then(result => result.json())
      .then(listDescription => {
        var jobDescription = [];
        // Reset the button
        this.setState({ disabledLoadBtn: false });
        if (listDescription.length !== 0) {
          for (let index = 0; index < listDescription.length; index++) {
            jobDescription.push(listDescription[index]);
          }
          // Update the Offsetindex for the DB
          var newOffsetindex = this.state.offsetIndex + DISPLAY_NUM_JOBS;
          // Set the new state
          this.setState(prevState => ({
            list: [...prevState.list, ...jobDescription],
            offsetIndex: newOffsetindex
          }));
        } else {
          // Disabled button, change message and
          // color of the button.
          this.setState({ disabledLoadBtn: true });
        }

        return true;
      })
      .then(result => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { list } = this.state;

    if (this.state.loading) return "Loading, wait.....";
    return (
      <div className="card-space">
        <DataEnteredDisplay />
        {list.map(item => {
          return (
            <Link
              to={{
                pathname: "/description/" + item.id,
                search: "?job_search=" + item.id,
                state: { list: list[item.id - 1] }
              }}
              className="card-remove-decoration"
              key={item.id}
            >
              <JobCard
                job_position={item.job_position}
                /* Use the "moment" module to display the date from now*/
                date_posted={moment(item.date_posted).fromNow()}
                company_name={item.company_name}
                job_hours={item.job_hours ? item.job_hours : "Full-Time"}
              />
            </Link>
          );
        })}
        <div className="JobContainer-loadButon-container">
          <button
            className="JobContainer-loadButton"
            onClick={() => this.getJobDescription(this.props.searchBoxData)}
            disabled={this.state.disabledLoadBtn}
            style={{
              backgroundColor: !this.state.disabledLoadBtn ? "" : "red"
            }}
          >
            {!this.state.disabledLoadBtn
              ? "Load More Jobs"
              : "Sorry, there are no more.."}
          </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(JobsContaier);
