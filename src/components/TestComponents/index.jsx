import { NE_SmallCard as NESmallCard } from 'components/common/NE_Card/NE_SmallCard';
import NE_TabChanger from 'components/common/NE_TabChanger';
import React from 'react';
import { BsApp } from 'react-icons/bs';
import Logger from 'utils/customLog';
import ErrorCard from '../common/NE_ErrorCard';

export default function TestComponents() {
  return (
    <>
      <div>
        <NE_TabChanger
          options={['daily', 'weekly', 'monthly']}
          onSelect={(e) => {
            Logger.log(e.target.clientWidth, e);
          }}
        />
        <hr></hr>
        <ErrorCard />
        <hr></hr>
        <NESmallCard icon={<BsApp />} />
        <hr></hr>
        <NESmallCard icon={null} value={5465454} text="text" unit="nxs" />
      </div>
    </>
  );
}
