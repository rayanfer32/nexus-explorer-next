import { NE_SmallCard as NESmallCard } from 'components/atoms/NE_Card/NE_SmallCard';
import React from 'react';
import { BsApp } from 'react-icons/bs';
import ErrorCard from '../atoms/NE_ErrorCard/ErrorCard';

export default function TestComponents() {
  return (
    <>
      <div>
        <ErrorCard />
        <hr></hr>
        <NESmallCard icon={<BsApp />} />
        <hr></hr>
        <NESmallCard icon={null} value={5465454} text="text" unit="nxs" />
      </div>
    </>
  );
}
