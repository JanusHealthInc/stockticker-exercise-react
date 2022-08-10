import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);

  // I want to issue some ticker events here, but with the implementation being
  // though window, I don't feel this exercise is intended to merit that degree
  // of integration with the hypothetical ticker. Just know that I would
  // normally test that way. Here I'll simply test off known information.

  // App ticker values for each of these cases
  const hypotheticalTickers = ["S&P 500", "DOW J", "NASDAQ"];

  hypotheticalTickers.forEach((ticker) => {
    // Make sure each of the contrived stocks is at least represented on the page
    // Should be only on the page once though (Going for "more refined" solution)
    expect(screen.getAllByText(ticker)).toHaveLength(1);
  });
});
