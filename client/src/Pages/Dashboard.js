import React, { Component } from "react";
import NavigationBarAdministrador from "../components/NavBarAdmin";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkAdminLogout } from "../actions";
import InsertJobsForm from "../components/InsertJobs-form";

/**
 * @author Osvaldo Carrillo
 * Date: 12/14/19
 * This class is designed to store the jobs of StackOveflow feed
 * into the DB. This can be access after the administrador provide
 * their credentials.
 */
class StorejobsDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      isSignedOut: false
    };
  }

  logoutUser = () => {
    this.setState({ isLoading: true }, () => {
      fetch("/api/logoutAdmin", {
        method: "POST"
      })
        .then(result => result.json())
        .then(result => {
          console.log("Last layer");
          if (result) {
            this.setState({ isSignedOut: result });
            this.setState({ isLoading: false });
            // Reset the value from the reducer
            // to avoid unexpedted results
            this.props.checkAdminLogout(false);
          }
        })
        .catch(async () => {
          await this.setState({ isLoading: false });

          // Catching the 500 status
          alert("Server Error 500");
        });
    });
  };

  componentDidUpdate(prevProps) {
    //Check when user logouts. Use the prevProps to
    // avoid looping
    if (this.props.isLogoutPress !== prevProps.isLogoutPress) {
      this.logoutUser();
    }
  }

  render() {
    if (this.state.isLoading) return "Login out Wait...";

    if (this.state.isSignedOut) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div>
        <NavigationBarAdministrador />
        <InsertJobsForm />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { isLogoutPress: state.adminDashboard.isLogoutPress };
}

const mapDispatchToProps = {
  checkAdminLogout
};
export default connect(mapStateToProps, mapDispatchToProps)(StorejobsDB);
