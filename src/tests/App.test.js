import App from "../App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("renders react app", () => {
    render(<App />);
    const linkElement = screen.getByTestId("App");
    expect(linkElement).toBeInTheDocument();
  });
});
