import { render, screen } from "@testing-library/react"
import App from "./App"

// Ok, so this test doesn't work, but if I was really approaching this problem
// I'm change the way the ticker works to accomodate testing, but Mike told me
// specifically he didn't want me to play around with that as it's not what
// y'all are testing. So this test acts as an example of the kind of thinking
// I'd apply, though it doesn't function.

test.skip("renders learn react link", async () => {
  render(<App />)

  // I want to issue some ticker events here, but with the implementation being
  // though window, I don't feel this exercise is intended to merit that degree
  // of integration with the hypothetical ticker. Just know that I would
  // normally test that way. Here I'll simply test off known information.

  // Give it a little time to work
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })

  // App ticker values for each of these cases
  const hypotheticalTickers = ["S&P 500", "DOW J", "NASDAQ"]

  hypotheticalTickers.forEach((ticker) => {
    // Make sure each of the contrived stocks is at least represented on the page
    // Should be only on the page once though (Going for "more refined" solution)
    expect(screen.getAllByText(ticker)).toHaveLength(1)
  })
})
