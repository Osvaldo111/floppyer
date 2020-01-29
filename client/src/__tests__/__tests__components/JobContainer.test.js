import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import JobContainer from "../../components/JobContainer";
/** This is use to pass the test accordingly */
import { Provider } from "react-redux";
import store from "../../reducers/store";
/***************************************** */

afterEach(cleanup);
it("Fetch data to display all the jobs", async () => {
  const { asFragment, findByTestId } = render(
    <Provider store={store}>
      <JobContainer />
    </Provider>
  );
});
