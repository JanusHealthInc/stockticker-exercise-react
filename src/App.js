import { useEffect, useReducer } from "react";
import "./App.css";
import { TickerQuote } from "./TickerQuote";

function App() {
  const [tickerDisplayState, dispatchTickerDisplayState] = useReducer(
    (state, tickerUpdate) => {
      const nextState = {
        ...state,
        [tickerUpdate.symbol]: {
          start: tickerUpdate.start,
          end: tickerUpdate.end,
          change: tickerUpdate.change,
        },
      };
      return nextState;
    },
    {}
  );

  useEffect(() => {
    if (!window.StockTicker) {
      console.error("StockTicker not found");
      return;
    }

    window.StockTicker.addListener((tick) => {
      console.log(tick);
      dispatchTickerDisplayState(tick);
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-900 p-10">
      <h1 className="font-bold font-sans text-4xl mb-5">Stock Ticker</h1>
      {Object.entries(tickerDisplayState).map(([symbol, values], i) => (
        <TickerQuote
          key={i}
          className="block w-full my-5 p-4 bg-slate-600 border-2 border-white rounded-sm"
          symbol={symbol}
          start={values.start}
          change={values.change}
          end={values.end}
        />
      ))}
    </div>
  );
}

export default App;
