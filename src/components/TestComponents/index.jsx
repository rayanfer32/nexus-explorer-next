import SelectInput from 'components/atoms/SelectInput/SelectInput';
import { useAppContext } from 'contexts/AppContext';
import Link from 'next/link';
import React from 'react';
import { NETWORKS } from 'types/ConstantsTypes';
import DropdownMenu from './DropdownMenu';

export default function TestComponents() {
  const { appContext, setAppContext } = useAppContext();

  return (
    <div>
      <DropdownMenu title="Blockchain">
        <Link href="/blocks">Blocks</Link>
        <Link href="/transactions">Transactions</Link>
      </DropdownMenu>
    </div>
  );
}
