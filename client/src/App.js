import React from "react";
import MainContainer from "./Pages/mainPage-container";
import JobDescription from "./components/job-desctiption";
import PostJob from "./Pages/postJob";
import LoginAdminstrador from "./Pages/login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "./Pages/Dashboard";
import PrivateRoute from "./components/Authentication/route-authentication";
function App() {
  // return <MainConainer />;
  const NoMatch = ({ location }) => (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <Route path="/description/:id" component={JobDescription} />
        <Route path="/postJob" component={PostJob} />
        <Route path="/login" component={LoginAdminstrador} />
        <PrivateRoute path="/storeJobsDB" component={DashBoard}></PrivateRoute>
        <Route path="*" component={NoMatch} />
        {/* <Route path="/NotFound" component={NoMatch} /> */}
      </Switch>
    </Router>
  );
}

export default App;
