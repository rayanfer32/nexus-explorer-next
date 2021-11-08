import { useEffect, useState } from 'react';
import styles from './Panel3.module.css';
import RTTable from 'components/atoms/RTTable/RTTable';
import RTTRowBlock from 'components/atoms/RTTable/RTTRowBlock';
import axios from 'axios';

function Panel3(props) {
  const [tableBlockRowElements, setTableBlockRowElements] = useState([]);
  const [tableTxRowElements, setTableTxRowElements] = useState([]);

  let lastBlock = 0;
  const MAX_ROWS = 6;
  const CHANNELS = { 0: 'Stake', 1: 'Prime', 2: 'Hash' };

  async function handleAddRow() {
    const latestBlockUrl = `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/latestBlock`;
    const latestBlockResp = await axios.get(latestBlockUrl);
    const newRowData = latestBlockResp.data;
    // FIXME: when using state for lastblock the if block fails (state out of sync) , currently fixed using let
    if (lastBlock != newRowData.height) {
      console.log('adding block ' + newRowData.height);
      lastBlock = newRowData.height;
      const newRow = (
        <RTTRowBlock
          block={newRowData.height}
          mint={newRowData.mint}
          txns={newRowData.tx.length}
          size={newRowData.size}
          channel={`Channel: ${CHANNELS[newRowData.channel]}`}
        />
      );
      setTableBlockRowElements((tableBlockRowElements) => [
        newRow,
        ...tableBlockRowElements.slice(0, MAX_ROWS - 1),
      ]);
    }
  }

  useEffect(() => {
    const interval1 = setInterval(
      () => handleAddRow(),
      Math.random() * 4000 + 1000
    );
    return () => {
      clearInterval(interval1);
    };
  }, []);

  return (
    <div className={styles.container}>
      <RTTable label="Recent Blocks">{tableBlockRowElements}</RTTable>
      <RTTable label="Recent Transactions">{tableTxRowElements}</RTTable>
    </div>
  );
}

export default Panel3;

/*
TODO:
* load 10 rows data on first page load
* Fetch latestBlock from api in useEffect to load new rows
* Clear the tableRows if it excees MAXROWS 

*/
