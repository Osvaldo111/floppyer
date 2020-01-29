import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import JobCard from "../../components/JobCard";

afterEach(cleanup);

describe("JobCard Component", () => {
  it("renders Job Card", () => {
    const { asFragment } = render(
      <JobCard
        job_position="Job Position"
        date_posted="Date Posted"
        company_name="Company Name"
        job_hours="Full Time / Part Time"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
