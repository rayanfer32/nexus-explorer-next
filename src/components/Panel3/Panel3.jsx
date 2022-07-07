import { useRouter } from 'next/router';
import styles from './Panel3.module.scss';
import { useEffect, useState } from 'react';
import { intlNum, toTitleCase } from 'utils/converter';
import Loader from 'components/common/NE_Loader';
import RTTable, {
  RTTRowBlock,
  RTTRowTransactions,
} from 'components/common/NE_RTTable';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { Warn } from 'utils';

function Panel3({ blocks }) {
  const router = useRouter();
  const [tableBlockRowElements, setTableBlockRowElements] = useState([]);
  const [tableTxRowElements, setTableTxRowElements] = useState([]);
  const BLOCK_SPEED = 30 * 1000; // in seconds
  const MAX_ROWS = 6;
  const { network, getRecentBlocks } = useNetwork();

  // * fetch latest blocks
  const { isLoading, data } = useQuery(
    ['blocks', network.name],
    () => getRecentBlocks(MAX_ROWS),
    {
      initialData: blocks,
      refetchInterval: BLOCK_SPEED,
    }
  );

  function addNewBlockRow(newRowData) {
    const newRow = (
      <RTTRowBlock
        key={newRowData.height}
        block={intlNum(newRowData.height)}
        date={new Date(newRowData.date).toLocaleTimeString()}
        mint={intlNum(newRowData.mint.toFixed(2))}
        txns={newRowData.tx.length}
        size={newRowData.size}
        channel={TYPES.CHANNELS[newRowData.channel]}
        onClick={() => router.push(`/scan/${newRowData.height}`)}
      />
    );
    setTableBlockRowElements((prev) => [newRow, ...prev].slice(0, MAX_ROWS));
  }

  function addNewTxRows(newRowData) {
    // TODO:
    // DONE: (Main logic ) Iterate over the txns and inside the txn iterate over the contracts
    // Ignore the txs with type=tritium base ( currently not ignored, for filling up the table.)
    // If type=legacy user , then show the input field as from and output as to
    // If type=tritium user, then show
    // If the tx has from and to fields in the contracts and then display if they exist , otherwise ignore

    try {
      let newRows = [];
      for (let txidx = 0; txidx < newRowData.length; txidx++) {
        for (let cidx = 0; cidx < newRowData[txidx].contracts.length; cidx++) {
          newRows.push(
            <RTTRowTransactions
              key={`${newRowData[txidx].txid}${txidx}${cidx}`}
              fromId={newRowData[txidx]?.contracts[cidx]?.from}
              toId={newRowData[txidx]?.contracts[cidx]?.to}
              txnId={newRowData[txidx]?.txid}
              operation={newRowData[txidx]?.contracts[cidx]?.OP}
              txType={toTitleCase(newRowData[txidx]?.type)}
              amount={intlNum(
                newRowData[txidx]?.contracts[cidx]?.amount?.toFixed(2)
              )}
              confirmations={newRowData[txidx]?.confirmations}
              contracts={newRowData[txidx]?.contracts?.length}
            />
          );
        }
      }

      setTableTxRowElements((prev) => [newRows, ...prev].slice(0, MAX_ROWS));
    } catch (err) {
      Warn(err);
    }
  }

  // * load data to the table
  useEffect(() => {
    if (data) {
      data.reverse().map((block) => {
        addNewBlockRow(block);
        addNewTxRows(block.tx);
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '200px',
          margin: 'auto',
        }}>
        <Loader type="circle" size="5rem" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* blocks RTT table */}
      <RTTable
        label="Recent Blocks"
        onClick={() => {
          router.push(`/blocks`);
        }}>
        {tableBlockRowElements}
      </RTTable>

      {/* transctions RTT table */}
      <RTTable
        label="Recent Transactions"
        onClick={() => {
          router.push(`/transactions`);
        }}>
        {tableTxRowElements}
      </RTTable>
    </div>
  );
}

export default Panel3;
