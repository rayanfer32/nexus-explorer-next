import InfoCard from 'components/atoms/InfoCard';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function BlockEstimator() {
  // https://nx1.rayanfer32.repl.co/blockFromTimestamp/1642153560
  const [timestamp, setTimestamp] = useState();
  const [blockData, setBlockData] = useState();
  const [block, setBlock] = useState();
  const [error, setError] = useState();

  useEffect(async () => {
    const estimatedBlock = await fetch(
      `https://nx1.rayanfer32.repl.co/blockFromTimestamp/${timestamp}`
    );
    try {
      const resp = await estimatedBlock.json();
      console.log(resp);
      setBlock(resp.estimatedBlock);
      setError(resp.error)
    } catch (err) {
      console.log(estimatedBlock);
    }
  }, [timestamp]);

  useEffect(async () => {
    const blockResp = await fetch(
      `https://nx1.rayanfer32.repl.co/ledger/get/block?height=${block}`
    );
    try {
      const resp = await blockResp.json();
      console.log(resp);
      setBlockData(resp.result);
    } catch (err) {
      console.log(err);
    }
  }, [block]);

  return (
    <div>
      {/* datepicker here */}
      
      <div style={{display: "flex",color:"white", background: "coral", padding: "1rem", gap: "1rem"}}>
      <input
        type="datetime-local"
        // value={timestamp}
        onChange={(e) => {
          const val = new Date(e.target.value).getTime() / 1000;
          setTimestamp(val);
        }}
      />
      <span>timestamp: {timestamp}</span>
      <span>block: {block}</span>
      <span>error: {error} seconds</span>
      </div>
      <InfoCard type="block" data={blockData || {}} />
    </div>
  );
}
