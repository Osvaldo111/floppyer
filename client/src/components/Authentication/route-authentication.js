import React from "react";
import { Route, Redirect } from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigned: null,
      loading: true
    };
  }

  componentDidMount() {
    this.authorization();
  }

  authorization() {
    fetch("/api/auth", {
      method: "POST"
    })
      .then(result => result.json())
      .then(result => {
        this.setState({ isSigned: result, loading: false });
      });
  }

  render() {
    // const { component: Component } = this.props;
    // return <Component {...this.props}/>;
    if (this.state.loading) return null;

    if (this.state.isSigned) return <Route {...this.props} />;

    return <Redirect to="/login" />;
  }
}
