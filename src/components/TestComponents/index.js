import SelectInput from 'components/atoms/SelectInput/SelectInput';
import { useAppContext } from 'contexts/AppContext';
import React from 'react';
import { NETWORKS } from 'types/ConstantsTypes';

export default function TestComponents() {
  const { appContext, setAppContext } = useAppContext();

  return (
    <div>
      <SelectInput
        value={appContext.network}
        options={[NETWORKS.MAINNET, NETWORKS.TESTNET]}
        onChange={(e) => {
          console.log(e.target.value);
          // setAppContext('network', e.target.value);
        }}
      />
    </div>
  );
}
