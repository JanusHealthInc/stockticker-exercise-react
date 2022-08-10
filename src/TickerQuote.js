let dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const TickerQuote = ({ symbol, start, end, change, className }) => (
  <div className={className}>
    <div className="flex justify-between">
      <div className="">
        <h2 className="font-bold text-lg">{symbol}</h2>
        <div>
          {dollarUS.format(start)} -{">"} {dollarUS.format(end)}
        </div>
      </div>
      <div
        className={`font-bold text-5xl ${
          change < 0 ? "text-red-700" : "text-green-600"
        }`}
      >
        {change < 0 ? "\u25BE" : "\u25B4"}
        {dollarUS.format(change)}
      </div>
    </div>
  </div>
);
