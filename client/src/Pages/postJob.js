import React from "react";
import "../style/form-post-job.css";
import PostJobForm from "../components/PostJobForm";

/**
 * @author Osvaldo Carrillo
 * Date: 11/27/2019
 * This class is responsible for displaying the form to
 * sent a job to the administrador.
 */
export default class PostJob extends React.Component {
  render() {
    return (
      <div>
        <PostJobForm />
      </div>
    );
  }
}
