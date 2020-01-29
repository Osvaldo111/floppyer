import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavBar from "../../components/NavBar";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);
describe("NavBar Component", () => {
  /**Wrap the component with BrowserRouter to avoid Link issues */
  it("Renders the Navigation Bar", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Checks title", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(getByTestId("title")).toHaveTextContent("floppyer");
  });
});
