import { render } from "@testing-library/react";
import { getByText, screen } from "@testing-library/dom";
import Back from "./back";
describe("test Back Component", () => {
  beforeEach(() => {
    render(<Back />);
  });
  it("render Back Component", () => {
    expect(screen.getByText(/back/i)).toBeInTheDocument();
  });
});

// Sry if did not write test, i was in Trip, it was force
