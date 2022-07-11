import InfoCard from 'components/common/InfoCard';
import React, { useState, useEffect } from 'react';
import Loader from 'components/common/NE_Loader';
import { useDarkMode } from 'hooks';
import Logger from 'utils/customLog';

export default function BlockEstimator() {
  // blockFromTimestamp/1642153560
  const [timestamp, setTimestamp] = useState();
  const [blockData, setBlockData] = useState();
  const [block, setBlock] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [isDarkMode] = useDarkMode();

  useEffect(async () => {
    const estimatedBlock = await fetch(
      `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/blockFromTimestamp/${timestamp}`
    );
    try {
      const resp = await estimatedBlock.json();
      Logger.log(resp);
      setBlock(resp.estimatedBlock);
      setError(resp.error);
    } catch (err) {
      Logger.error(estimatedBlock);
    }
  }, [timestamp]);

  useEffect(async () => {
    setLoading(true);
    const blockResp = await fetch(
      `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/edger/get/block?height=${block}`
    );
    try {
      const resp = await blockResp.json();
      Logger.log(resp);
      setBlockData(resp.result);
    } catch (err) {
      Logger.error(err);
    }
    setLoading(false);
  }, [block]);

  return (
    <div>
      {/* datepicker here */}
      <div
        style={{
          display: 'flex',
          color: 'white',
          background: 'coral',
          padding: '1rem',
          gap: '1rem',
        }}>
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
        <span>DARK MODE: {JSON.stringify(isDarkMode)} </span>
      </div>
      {loading ? (
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            minHeight: '200px',
            margin: 'auto',
          }}>
          <Loader type="circle" size="5rem" />
        </div>
      ) : (
        <InfoCard type="block" data={blockData || {}} />
      )}
    </div>
  );
}
