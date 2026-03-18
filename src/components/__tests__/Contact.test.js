import { render, screen } from "@testing-library/react";
import Contact from "../contact";
import "@testing-library/jest-dom";

describe("Contact Us Page Test Cases", () => {
     
  test("should load contact us component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");

    //Assertion
    expect(heading).toBeInTheDocument();
  });

  test("should load button us component", () => {
    render(<Contact />);

    const heading = screen.getByText("Submit");

    //Assertion
    expect(heading).toBeInTheDocument();
  });

  test("Should load 2 input boxes on the contact component", () => {
    render(<Contact />);

    // Querying
    const inputBoxes = screen.getAllByRole("textbox");

    console.log(inputBoxes.length);

    //Assertion
    expect(inputBoxes.length).toBe(2);
  });
});
