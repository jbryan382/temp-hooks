// @ts-nocheck
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function App() {
  const [currencyResults, setCurrencyResults] = useState({ rates: [] });
  const [amount, setAmount] = useState(1);

  useEffect(async () => {
    const resp = await axios.get(`https://api.coingecko.com/api/v3/exchange_rates`)
    setCurrencyResults(resp.data)
  }, []);

  useEffect(() => {
    console.log(currencyResults);
  }, [currencyResults]);

  return <>
    <ul>
      {Object.entries(currencyResults.rates).map(([currencyCode, currencyDetails]) => {
        return <li key={currencyCode}> {currencyDetails.name} ({currencyCode}): {(currencyDetails.value * amount).toFixed(2)}</li>
      })}
    </ul>
    <input type="number" onChange={event => setAmount(event.target.value)} value={amount} />
  </>
}
