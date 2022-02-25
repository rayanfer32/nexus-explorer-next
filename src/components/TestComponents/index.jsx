import SelectInput from 'components/atoms/SelectInput/SelectInput';
import SmallCard from 'components/atoms/SmallCard';
import { NE_SmallCard as NESmallCard } from 'components/atoms/NE_Card/NE_SmallCard';
import { useAppContext } from 'contexts/AppContext';
import Link from 'next/link';
import React from 'react';
import { NETWORKS } from 'types/ConstantsTypes';
import { BsApp } from 'react-icons/bs';

export default function TestComponents() {
  const { appContext, setAppContext } = useAppContext();

  return (
    <>
      <div>
        <SmallCard />
        <hr></hr>
        <NESmallCard icon={<BsApp />} />
        <hr></hr>
        <NESmallCard icon={null} value={5465454} text="text" unit="nxs" />
      </div>
    </>
  );
}
