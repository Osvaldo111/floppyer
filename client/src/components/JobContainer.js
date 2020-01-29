import React from "react";
import JobCard from "./JobCard";
import "../style/card-container.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setSearchBoxData } from "../actions";
import DataEnteredDisplay from "./DataSearchBox";
import { ServerError } from "./ServerError500";
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
      loadingPage: true,
      lastSearch: null,
      currentSearch: null,
      displayNotFoundSearch: false,
      loadingResultsOfSearch: false,
      jobsWithSameKeyword: false,
      is500Error: false
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
    // Reset the variables "loadingResultsOfSearch" and "disabledLoadBtn"
    // And use the callback of the setState
    this.setState(
      { loadingResultsOfSearch: true, disabledLoadBtn: true },
      () => {
        // Getting the data from the server.
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
          .then(result => {
            // Check the response
            if (result.status === 500) {
              throw new Error(result.status);
            } else {
              return result.json();
            }
          })
          .then(result => {
            console.log("Result getJob see status: ", result);
            // Reset the "displayNotFoundSearch".
            // And assign the "currentSearch" to compare with the last search.
            this.setState({
              currentSearch: this.props.searchBoxData,
              displayNotFoundSearch: false
            });
            return result;
          })
          .then(listDescription => {
            var jobDescription = [];

            // Check if there is a result from the server.
            if (listDescription.length !== 0) {
              for (let index = 0; index < listDescription.length; index++) {
                jobDescription.push(listDescription[index]);
              }
              // Update the Offsetindex for the DB
              var newOffsetindex = this.state.offsetIndex + DISPLAY_NUM_JOBS;
              // Set the new states
              this.setState(prevState => ({
                list: [...prevState.list, ...jobDescription],
                offsetIndex: newOffsetindex,
                lastSearch: this.props.searchBoxData,
                disabledLoadBtn: false,
                jobsWithSameKeyword: false
              }));
            } else if (this.state.lastSearch === this.state.currentSearch) {
              // Disabled button, change message and
              // color of the button.
              this.setState({
                disabledLoadBtn: true,
                jobsWithSameKeyword: true
              });
            } else {
              // Display the not found search
              this.setState({ displayNotFoundSearch: true });
            }

            return true;
          })
          .then(result => {
            this.setState({
              loadingPage: false,
              loadingResultsOfSearch: false
            });
          })
          .catch(error => {
            this.setState({ is500Error: true });
          });
      }
    );
  };

  render() {
    const { list } = this.state;
    const { is500Error } = this.state;

    if (is500Error)
      return (
        <div data-testid="500Error">
          <ServerError />
        </div>
      );
    if (this.state.loadingPage)
      return <p data-testid="loading">"Loading, wait....."</p>;

    if (this.state.displayNotFoundSearch)
      return (
        <div className="container-serachNotFound">
          <h3>Try with another keyword. For example: Node, Wordpress, React</h3>
          <p>
            The search <b>"{this.state.currentSearch}"</b> was not found
          </p>
        </div>
      );

    return (
      <div className="card-space">
        {/* Check if offset has been updated */}
        {this.state.offsetIndex ? <DataEnteredDisplay /> : "Loading results..."}

        {/* Iteration of the array */}
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
                data-testid="jobCard"
                job_position={item.job_position}
                /* Use the "moment" module to display the date from now*/
                date_posted={moment(item.date_posted).fromNow()}
                company_name={item.company_name}
                job_hours={item.job_hours ? item.job_hours : "Full-Time"}
              />
            </Link>
          );
        })}

        {/* Check the array before displaying the button */}
        {/* For the color of the button. When the button is disabled and
            there are no more matches with the keyword change to 'red'. And when
            the button is disabled and the results are loading change to 'gray' */}
        {list.length > 0 ? (
          <div className="JobContainer-loadButon-container">
            <button
              className="JobContainer-loadButton"
              onClick={() => this.getJobDescription(this.props.searchBoxData)}
              disabled={this.state.disabledLoadBtn}
              style={{
                backgroundColor:
                  this.state.disabledLoadBtn && this.state.jobsWithSameKeyword
                    ? "red"
                    : "" ||
                      (this.state.disabledLoadBtn &&
                        this.state.loadingResultsOfSearch)
                    ? "gray"
                    : ""
              }}
            >
              {this.state.disabledLoadBtn && this.state.jobsWithSameKeyword
                ? "Sorry there are no more Jobs"
                : this.state.jobsWithSameKeyword === false &&
                  this.state.loadingResultsOfSearch
                ? "Loading..."
                : "Load More Jobs"}
            </button>
          </div>
        ) : (
          ""
        )}
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
