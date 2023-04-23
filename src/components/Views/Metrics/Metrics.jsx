import React from 'react';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { NE_CompactCard as SmallCard } from 'components/common/NE_Card/NE_CompactCard';
import styles from './styles.module.scss';
import { intlNum, toTitleCase } from 'utils/converter';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { METRICS_META } from 'types/StringsTypes';
import { pathOr } from 'utils';
import PromiseLayout from 'components/HOC/PromiseLayout';
import LedgerMetrics from './LedgerMetrics';

export default function Metrics() {
  //* fetchMetrics should be created from a custom hook which
  //* updates along with the change of network in appContext
  const { network, getMetrics, getMining, getTotalNXS } = useNetwork();
  const metricsRQ = useQuery(['metrics', network.name], getMetrics, {
    refetchInterval: TYPES.REFETCH_INTERVALS.METRICS,
  });

  // const metricsData = metricsRQ?.data?.data?.result;
  const metricsData = pathOr({}, ['data', 'data', 'result'], metricsRQ);

  const miningRQ = useQuery(['mining', network.name], getMining, {
    refetchInterval: TYPES.REFETCH_INTERVALS.MINING,
  });

  const totalNXSRQ = useQuery(['totalNXSRQ', network.name], getTotalNXS);

  const miningData = miningRQ.data?.data?.result;

  const SmallCards = ({ object, type }) => {
    return Object.entries(object).map(([k, v]) => {
      if (typeof v != 'object') {
        return (
          <SmallCard
            key={k}
            label={METRICS_META[type][k]?.label || toTitleCase(k)}
            sublabel={type && METRICS_META[type][k]?.sublabel}
            value={intlNum(v?.toFixed(2))}
            unit={type && METRICS_META[type][k]?.ticker}
            icon={type && METRICS_META[type][k]?.icon}
          />
        );
      }
    });
  };

  return (
    <div>
      <PromiseLayout
        isLoading={miningRQ.isLoading || metricsRQ.isLoading}
        isError={metricsRQ.isError || miningRQ.isError}
        error={pathOr({}, ['response', 'data', 'error'], metricsRQ.error)}
        loaderType={TYPES.LOADER.CIRCLE}>
        {metricsRQ.data && miningRQ.data && (
          <div className={styles.container}>
            <h3>Registers</h3>
            <div className={styles.cardGroup}>
              <SmallCard
                label={METRICS_META.sigchains.label}
                sublabel={METRICS_META.sigchains.sublabel}
                value={intlNum(metricsData.sigchains)}
                icon={METRICS_META.sigchains.icon}
              />
              <SmallCards type="registers" object={metricsData.registers} />

              {/* //* register.names */}
              <SmallCard
                label={METRICS_META.registers.names.global.label}
                sublabel={METRICS_META.registers.names.global.sublabel}
                value={intlNum(metricsData.registers.names.global)}
                icon={METRICS_META.registers.names.global.icon}
              />
              <SmallCard
                label={METRICS_META.registers.names.local.label}
                sublabel={METRICS_META.registers.names.local.sublabel}
                value={intlNum(metricsData.registers.names.local)}
                icon={METRICS_META.registers.names.local.icon}
              />
              <SmallCard
                label={METRICS_META.registers.names.namespaced.label}
                sublabel={METRICS_META.registers.names.namespaced.sublabel}
                value={intlNum(metricsData.registers.names.namespaced)}
                icon={METRICS_META.registers.names.namespaced.icon}
              />

              {/* //* objects.names */}
              {Object.entries(metricsData.registers.objects).map(([k, v]) => {
                return (
                  <SmallCard
                    key={k}
                    label={METRICS_META.registers.objects[k]?.label}
                    sublabel={METRICS_META.registers.objects[k]?.sublabel}
                    value={intlNum(v)}
                    icon={METRICS_META.registers.objects[k]?.icon}
                  />
                );
              })}

              {/* //* objects.names */}
              {Object.entries(metricsData.registers.state).map(([k, v]) => {
                return (
                  <SmallCard
                    key={k}
                    label={METRICS_META.registers.state[k]?.label}
                    sublabel={METRICS_META.registers.state[k]?.sublabel}
                    value={intlNum(v)}
                    icon={METRICS_META.registers.state[k]?.icon}
                  />
                );
              })}
            </div>

            <h3>Trust</h3>
            <div className={styles.cardGroup}>
              <SmallCard
                label={METRICS_META.trust.staked_percentage.label}
                unit={METRICS_META.trust.staked_percentage.ticker}
                value={(
                  (metricsData.trust.stake / miningData.supply.total) *
                  100
                ).toFixed(2)}
                icon={METRICS_META.trust.staked_percentage.icon}
              />
              <SmallCards type="trust" object={metricsData.trust} />
            </div>

            <h3>Supply</h3>

            <div className={styles.cardGroup}>
              <SmallCard
                label={'Total NXS'}
                unit={'NXS'}
                value={totalNXSRQ.data}
                icon={METRICS_META.trust.staked_percentage.icon}
              />
              <SmallCards type="supply" object={miningData.supply} />
            </div>

            <h3>Reserves</h3>
            <div className={styles.cardGroup}>
              <SmallCards type="reserves" object={metricsData.reserves} />
            </div>
          </div>
        )}
      </PromiseLayout>
      <LedgerMetrics />
    </div>
  );
}
