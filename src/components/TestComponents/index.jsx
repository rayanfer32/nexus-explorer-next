import SelectInput from 'components/atoms/SelectInput/SelectInput';
import { useAppContext } from 'contexts/AppContext';
import React from 'react';
import { NETWORKS } from 'types/ConstantsTypes';
import DropdownMenu from './DropdownMenu';

export default function TestComponents() {
  const { appContext, setAppContext } = useAppContext();

  return (
    <div>
      <DropdownMenu title="Blockchain">
        <a href="/blocks">Blocks</a>
        <a href="/transactions">Transactions</a>
      </DropdownMenu>
    </div>
  );
}
