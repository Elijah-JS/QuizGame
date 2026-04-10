import { render, screen } from "@testing-library/react";
import App from "../app/App";

test("renders study tagline", () => {
  render(<App />);
  expect(screen.getByText(/Study smarter/i)).toBeInTheDocument();
});
