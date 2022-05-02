import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

export default function ChartApi() {
  // * fetch the blocks first and extract the total number of contracts inside the trasactions
  const [contracts, setContracts] = useState([]);
  const [dateStamps, setDateStamps] = useState([]);
  const [limit, setLimit] = useState(10);

  const { isLoading, data } = useQuery(['charting', limit], async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?limit=${limit}&verbose=summary`
    );
    return res.json();
  });

  useEffect(() => {
    if (data) {
      let _dateStamps = [];
      let _contracts = [];
      data.result.map((block) => {
        _dateStamps.push(block.date);
        let _contractsLengths = block.tx.map((tx) => {
          return tx?.contracts?.length || tx?.inputs?.length;
        });
        _contracts.push(_contractsLengths.reduce((a, b) => a + b, 0));
      });
      setContracts(_contracts);
      setDateStamps(_dateStamps);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ color: 'var(--theme-page-text)' }}>
      <h1>ChartApi</h1>
      <pre>DateStamps: {JSON.stringify(dateStamps, null, 2)}</pre>
      <pre>Contracts: {JSON.stringify(contracts, null, 2)}</pre>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}></input>
    </div>
  );
}
