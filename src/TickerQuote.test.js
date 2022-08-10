import {
  cleanup,
  getDefaultNormalizer,
  render,
  screen,
} from "@testing-library/react"
import * as fc from "fast-check"
import { ChangeDisplayValue, dollarUS, TickerQuote } from "./TickerQuote"

const escapeStringForRegExp = (input) =>
  input.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&")

test("renders correctly", () => {
  fc.assert(
    fc
      .property(
        fc
          .string({ minLength: 3, maxLength: 10 })
          .map((t) => t.trim())
          .filter((t) => t.length > 3),
        fc.integer({ min: -9999, max: 9999 }),
        fc.integer({ min: -9999, max: 9999 }),
        (symbol, start, end) => {
          const change = start - end
          render(
            <TickerQuote
              symbol={symbol}
              start={start}
              end={end}
              change={change}
            />,
          )
          expect(
            screen.getAllByText(symbol, {
              normalizer: getDefaultNormalizer({ collapseWhitespace: false }),
            }),
          ).not.toHaveLength(0)
          expect(
            screen.getAllByText(getRegExpForCurrencyValue(start)),
          ).not.toHaveLength(0)
          expect(
            screen.getAllByText(getRegExpForCurrencyValue(end)),
          ).not.toHaveLength(0)
          expect(
            screen.getAllByText(getRegExpForCurrencyValue(Math.abs(change))),
          ).not.toHaveLength(0)
        },
      )
      .beforeEach(cleanup),
  )
})

test("to produce the correct change value for negative numbers", () => {
  fc.assert(
    fc
      .property(
        fc
          .integer({ min: Number.MIN_SAFE_INTEGER, max: -1 })
          .filter((t) => !Number.isNaN(t)),
        (negativeNum) => {
          render(<ChangeDisplayValue value={negativeNum} />)
          const ele = screen.getByText(
            getRegExpForCurrencyValue("\u25BE " + Math.abs(negativeNum)),
          )
          expect(ele).toBeInTheDocument()
          expect(ele).toHaveClass("text-red-700")
        },
      )
      .beforeEach(cleanup),
  )
})

test("to produce the correct change value for positive numbers", () => {
  fc.assert(
    fc
      .property(
        fc
          .integer({ min: 1, max: Number.MAX_SAFE_INTEGER })
          .filter((t) => !Number.isNaN(t)),
        (positiveNum) => {
          render(<ChangeDisplayValue value={positiveNum} />)
          const ele = screen.getByText(
            getRegExpForCurrencyValue("\u25B4 " + positiveNum),
          )
          expect(ele).toBeInTheDocument()
        },
      )
      .beforeEach(cleanup),
  )
})

test("to produce the correct change value for zero", () => {
  render(<ChangeDisplayValue value={0} />)

  expect(screen.getByText(/\$0.00/)).toBeInTheDocument()
})

function getRegExpForCurrencyValue(start) {
  return new RegExp(escapeStringForRegExp(dollarUS.format(start)))
}
