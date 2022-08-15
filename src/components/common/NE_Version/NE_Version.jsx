import { useNetwork } from 'hooks/useNetwork/useNetwork';
import React from 'react';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { getVersion } from 'utils/getVersion';
import NE_Badge from '../NE_Badge';

export default function NE_Version() {
  const { network, getInfo } = useNetwork();
  const { data } = useQuery(['info', network.name], getInfo, {
    refetchInterval: TYPES.REFETCH_INTERVALS.METRICS,
  });

  return (
    <div>
      <NE_Badge>{'explorer v' + getVersion()}</NE_Badge>
      {data?.data?.result?.version && (
        <NE_Badge>{'Node v' + data?.data?.result?.version}</NE_Badge>
      )}
      <style jsx>{`
        div {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }
      `}</style>
    </div>
  );
}
