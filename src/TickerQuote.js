export const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export const ChangeDisplayValue = ({ value: change }) => {
  let icon = change === 0 ? "" : change < 0 ? "\u25BE" : "\u25B4"
  let changeValueTxt = `${icon} ${dollarUS.format(Math.abs(change))}`
  return (
    <div
      className={`font-bold text-5xl ${
        change === 0
          ? "text-gray-400"
          : change < 0
          ? "text-red-700"
          : "text-green-600"
      }`}
    >
      {changeValueTxt}
    </div>
  )
}

export const TickerQuote = ({ symbol, start, end, change, className }) => (
  <div className={className}>
    <div className="flex justify-between">
      <div className="">
        <h2 className="font-bold text-lg">{symbol}</h2>
        <div>
          {dollarUS.format(start)} -{">"} {dollarUS.format(end)}
        </div>
      </div>
      <ChangeDisplayValue value={change} />
    </div>
  </div>
)
