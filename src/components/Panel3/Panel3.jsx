import { useEffect, useState } from 'react';
import styles from './Panel3.module.css';
import RTTable from 'components/atoms/RTTable/RTTable';
import RTTRow from 'components/atoms/RTTable/RTTRow';
import RTTRowBlock from 'components/atoms/RTTable/RTTRowBlock';
import axios from 'axios';
import { intlNum, toTitleCase } from 'utils/converter';

function Panel3(props) {
  const [tableBlockRowElements, setTableBlockRowElements] = useState([]);
  const [tableTxRowElements, setTableTxRowElements] = useState([]);
  const blockSpeed = 30 * 1000; // in seconds
  let lastBlock = 0;
  const MAX_ROWS = 6;
  const CHANNELS = { 0: 'Stake', 1: 'Prime', 2: 'Hash' };

  function addNewBlockRow(newRowData) {
    //console.log('adding block ' + newRowData.height);
    lastBlock = newRowData.height;
    const newRow = (
      <RTTRowBlock
        key={newRowData.height}
        block={intlNum(newRowData.height)}
        mint={intlNum(newRowData.mint.toFixed(2))}
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

  function addNewTxRow(newRowData) {
    //console.log('adding txn ');
    //console.log(newRowData);
    // FIXME:
    // TODO:
    // Ignore the txs with type=tritium base
    // If type=legacy user , then show the input field as from and output as to
    // If type=tritium user, then show
    // If the tx has from and to fields in the contracts and then display if they exist , otherwise ignore

    try {
      const newRows = newRowData.map((txn, index) => (
        <RTTRow
          key={`${txn.txid}${index}`}
          fromId={txn?.contracts[0]?.from}
          toId={txn?.contracts[0]?.to}
          txnId={txn?.txid}
          operation={txn?.contracts[0]?.OP}
          txType={toTitleCase(txn?.type)}
          amount={intlNum(txn?.contracts[0]?.amount.toFixed(2))}
          confirmations={txn?.confirmations}
          contracts={txn?.contracts?.length}
        />
      ));

      setTableTxRowElements((tableBlockRowElements) => {
        const rowUpdate = [...newRows, ...tableBlockRowElements];
        return rowUpdate.slice(0, MAX_ROWS);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddRow() {
    const latestBlockUrl = `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/latestBlock`;
    const latestBlockResp = await axios.get(latestBlockUrl);
    const newRowData = latestBlockResp.data;
    // FIXME: when using state for lastblock the if block fails (state out of sync) , currently fixed using let
    if (lastBlock != newRowData.height) {
      addNewBlockRow(newRowData);
      addNewTxRow(newRowData.tx);
    }
  }

  async function loadTable(limit) {
    const recentBlocksUrl = `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?verbose=summary&limit=${limit}`;
    const resp = await axios.get(recentBlocksUrl);
    const newBlocksData = resp.data.result;
    //console.log(newBlocksData);
    // TODO:
    // Ignore the txs with type=tritium base
    // If type=legacy user , then show the input field as from and output as to
    // If type=tritium user, then show
    // If the tx has from and to fields in the contracts and then display if they exist , otherwise ignore

    newBlocksData.reverse().map((block) => {
      addNewBlockRow(block);
      addNewTxRow(block.tx);
      block.tx.forEach((txn) => {
        // addNewContractRow(txn);
        if (txn.type === 'tritium base') {
          //console.log('tritium base txn');
        }
        // else if()
      });
    });
  }

  useEffect(() => {
    // TODO:  fetch  6 latest blocks using limit
    loadTable(6);
  }, []);

  useEffect(() => {
    const interval1 = setInterval(handleAddRow, blockSpeed);
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
