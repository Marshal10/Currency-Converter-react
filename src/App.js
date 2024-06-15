import { useEffect, useState } from "react";

export default function App() {
  const [fromCurr, setFromCurr] = useState("EUR");
  const [toCurr, setToCurr] = useState("USD");
  const [amt, setAmt] = useState(1);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchResult() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amt}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setOutput((o) => data.rates[`${toCurr}`]);
        setIsLoading(false);
      }
      if (fromCurr === toCurr) return setOutput(amt);
      fetchResult();
    },
    [amt, fromCurr, toCurr]
  );

  return (
    <div>
      <input
        type="text"
        value={amt}
        onChange={(e) => setAmt((a) => +e.target.value)}
        disabled={isLoading}
      />
      <select
        value={fromCurr}
        onChange={(e) => setFromCurr((c) => e.target.value)}
        disabled={isLoading}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurr}
        onChange={(e) => setToCurr((c) => e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {toCurr}
      </p>
    </div>
  );
}
