import { NE_CompactCard as SmallCard } from 'components/common/NE_Card/NE_CompactCard';
import { useNetwork } from 'hooks';
import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { intlNum, toTitleCase } from 'utils';
import styles from './styles.module.scss';
import { FaExchangeAlt } from 'react-icons/fa';

export default function LedgerMetrics() {
  const { network, getLedgerMetrics } = useNetwork();

  const ledgerMetricsRQ = useQuery(
    ['ledgerMetrics', network.name],
    getLedgerMetrics
  );

  const ledgerData = ledgerMetricsRQ?.data?.data?.result;

  const DURATIONS = {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
  };

  const [selectedDuration, setSelectedDuration] = useState('daily');

  return (
    <div className={styles.container}>
      <h2>Network Ledger Metrics</h2>
      <div className={styles.durationSelector}>
        {Object.keys(DURATIONS).map((val) => (
          <div
            key={val}
            className={selectedDuration === val && styles.active}
            onClick={() => {
              setSelectedDuration(val);
            }}>
            {toTitleCase(val)}
          </div>
        ))}
      </div>
      <h3>Transaction Volumes</h3>
      <div className={styles.cardGroup}>
        <SmallCard
          label="Transcations"
          sublabel=""
          value={intlNum(ledgerData.volumes.transactions[selectedDuration])}
          unit=""
          icon={<FaExchangeAlt />}
        />
        <SmallCard
          label="Contracts"
          sublabel=""
          value={intlNum(ledgerData.volumes.contracts[selectedDuration])}
          unit=""
          icon={<FaExchangeAlt />}
        />
        <SmallCard
          label="Accounts"
          sublabel=""
          value={intlNum(ledgerData.volumes.accounts[selectedDuration])}
          unit=""
          icon={<FaExchangeAlt />}
        />
      </div>

      <h3>Exchange Operations</h3>
      <div className={styles.cardGroup}>
        <SmallCard
          label="Deposits"
          sublabel=""
          value={intlNum(ledgerData.exchanges.deposits[selectedDuration])}
          unit="NXS"
          icon={<FaExchangeAlt />}
        />
        <SmallCard
          label="Withdraws"
          sublabel=""
          value={intlNum(ledgerData.exchanges.withdraws[selectedDuration])}
          unit="NXS"
          icon={<FaExchangeAlt />}
        />
      </div>

      <h3>Network Stats</h3>
      <div className={styles.cardGroup}>
        <SmallCard
          label="Staking"
          sublabel="(mint)"
          value={intlNum(ledgerData.network.mint.staking[selectedDuration])}
          unit="NXS"
          icon={<FaExchangeAlt />}
        />
        <SmallCard
          label="Minting"
          sublabel="(mint)"
          value={intlNum(ledgerData.network.mint.mining[selectedDuration])}
          unit="NXS"
          icon={<FaExchangeAlt />}
        />
        <SmallCard
          label="Stake"
          sublabel=""
          value={intlNum(ledgerData.network.stake[selectedDuration])}
          unit="NXS"
          icon={<FaExchangeAlt />}
        />
      </div>

      {/* <pre>{JSON.stringify(ledgerMetricsRQ?.data?.data?.result, null, 2)}</pre> */}
    </div>
  );
}
