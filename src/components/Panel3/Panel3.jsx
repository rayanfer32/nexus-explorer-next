import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './Panel3.module.css';
import { useEffect, useState } from 'react';
import RTTable from 'components/atoms/RTTable/RTTable';
import RTTRow from 'components/atoms/RTTable/RTTRow';
import { intlNum, toTitleCase } from 'utils/converter';
import Loader from 'components/atoms/NE_Loader';
import RTTRowBlock from 'components/atoms/RTTable/RTTRowBlock';
import { useQuery, useQueryClient } from 'react-query';
import TYPES from 'types';

function Panel3() {
  // const queryClient = useQueryClient();
  const [tableBlockRowElements, setTableBlockRowElements] = useState([]);
  const [tableTxRowElements, setTableTxRowElements] = useState([]);
  const blockSpeed = 30 * 1000; // in seconds
  const router = useRouter();

  let lastBlock = 0;
  const MAX_ROWS = 6;

  function addNewBlockRow(newRowData) {
    lastBlock = newRowData.height;
    const newRow = (
      <RTTRowBlock
        key={newRowData.height}
        block={intlNum(newRowData.height)}
        date={new Date(newRowData.date).toLocaleTimeString()}
        mint={intlNum(newRowData.mint.toFixed(2))}
        txns={newRowData.tx.length}
        size={newRowData.size}
        channel={TYPES.channels[newRowData.channel]}
        link={`/scan/${newRowData.height}`}
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
    // FIXME: When new block is fetched in 30s we lose a block sometimes , bcz the latestBlock fetches only the topmost block

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
            <RTTRow
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

      setTableTxRowElements((tableBlockRowElements) => {
        const rowUpdate = [...newRows, ...tableBlockRowElements];
        return rowUpdate.slice(0, MAX_ROWS);
      });
    } catch (err) {
      console.error(err);
    }
  }

  // * fetch latest blocks
  const { isLoading, data } = useQuery(
    'blocks',
    async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?verbose=summary&limit=${MAX_ROWS}`
      );
      return res.data.result;
    },
    {
      refetchInterval: blockSpeed,
    }
  );

  // * load data to the table
  useEffect(() => {
    if (data) {
      data.reverse().map((block) => {
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
