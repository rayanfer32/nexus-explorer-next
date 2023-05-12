import { NE_CompactCard as SmallCard } from 'components/common/NE_Card/NE_CompactCard';
import { useNetwork } from 'hooks';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { intlNum, pathOr } from 'utils';
import styles from './styles.module.scss';
import { FaExchangeAlt } from 'react-icons/fa';
import TYPES from 'types';
import PromiseLayout from 'components/HOC/PromiseLayout';
import NE_TabChanger from 'components/common/NE_TabChanger';

const TAB_CHANGER_OPTIONS = ['daily', 'weekly', 'monthly'];

export default function LedgerMetrics() {
  const { network, getLedgerMetrics } = useNetwork();

  const ledgerMetricsRQ = useQuery(
    ['ledgerMetrics', network.name],
    getLedgerMetrics
  );

  const ledgerData = ledgerMetricsRQ.data?.data?.result;

  const [selectedDuration, setSelectedDuration] = useState(
    TAB_CHANGER_OPTIONS[0]
  );

  return (
    <PromiseLayout
      isLoading={ledgerMetricsRQ.isLoading}
      isError={ledgerMetricsRQ.isError}
      error={pathOr({}, ['response', 'data', 'error'], ledgerMetricsRQ.error)}
      loaderType={TYPES.LOADER.CIRCLE}>
      {ledgerData && (
        <div className={styles.container}>
          <h2>Network Ledger Metrics</h2>
          <NE_TabChanger
            options={TAB_CHANGER_OPTIONS}
            onSelect={(_, val) => {
              setSelectedDuration(val);
            }}
          />
          <h3>Transaction Volumes</h3>
          <div className={styles.cardGroup}>
            <SmallCard
              label="Transactions"
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

          <h3>Legacy Transactions</h3>
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
              label="Mining"
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
        </div>
      )}
    </PromiseLayout>
  );
}
