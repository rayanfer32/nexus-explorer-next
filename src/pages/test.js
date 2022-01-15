import Button from 'components/atoms/NE_Button';
import Card from 'components/atoms/NE_Card';
import Loader from 'components/atoms/NE_Loader';
import Text from 'components/atoms/NE_Text';
import InfoCard from 'components/atoms/InfoCard';
import TYPES from 'types';
import ChartsApex from 'components/Chart/ChartsApex';
import { middleElipsis } from 'utils/converter';
import { Fragment } from 'react';
import Table from 'components/Table/Table';
import blocks100 from 'assets/data/ledger.list.blocks100.json';

function test() {
  const blockData = {
    bits: '7c07227d',
    channel: 2,
    date: '2015-06-03 23:23:23 UTC',
    difficulty: 8.970082,
    hash: '00000000032d124cd960338bd530bed9c659453c9b7f180c9dde696b0c93a65be00687b1debf907e719ebb4e9416e0c7f157d51cab305ccc1ee7195fc8b68b51aaf288fc70fd472db092cb5fe3f64640500ad0baf3f11b9b3f8c5b1a8ef1cca9743957d445224aff121903d1b1bba3571a2e025582e686f09fab8466ffa9bfa4',
    height: 283234,
    merkleroot:
      '47d90ee7aae286d375aedb8e533924ee681cec83affb41f127dad3d3021db87115f17f43b12f5a24298c5b531c5e6e9326cc42e6f04ffff1c429e8d5075b0b38',
    mint: 55.638687,
    nextblockhash:
      'b5afafc878af8b29c80decc82709b29699a5e9a04a37ace9207ee1b93d2b76bf58dd49ddf8683f2854731a8d3f24b38a21eb2ac63fc7d27c0ebc3c9f0f85ee9e7586ff42ecb59e19e3899852700d4c1290073ec54d8cf0a848a8e1dba5ac51a62396f2dca6f5f6de0b007c35eea006e32194486fea2317f82aede4973cb3de8a',
    nonce: 40059157,
    previousblockhash:
      '00000000042d662890e38b58d9fbc479cccc1d7bb2e237636ab4a318f493e33dbd023d0d74a6a6fd5a800cc910b673b5d1ebe358c795d206b62237b79ec82e770e530e961e96d4b56bd17c1d4fab82c9c31c1710007a9f8f0c0ea3b8d87f0440e8d8097853e1b16a6df161ecaf85e2462870118da9293a3f00823431baa21e49',
    proofhash:
      '00000000032d124cd960338bd530bed9c659453c9b7f180c9dde696b0c93a65be00687b1debf907e719ebb4e9416e0c7f157d51cab305ccc1ee7195fc8b68b51aaf288fc70fd472db092cb5fe3f64640500ad0baf3f11b9b3f8c5b1a8ef1cca9743957d445224aff121903d1b1bba3571a2e025582e686f09fab8466ffa9bfa4',
    size: 812,
    timestamp: 1433373803,
  };

  // const normalizedBlockData = {};
  // Object.entries(blockData).forEach(([key, value]) => {
  //   normalizedBlockData[key] =
  //     value.toString().length > 8 ? middleElipsis(value, 7) : value;
  // });

  const blocksColumns = [
    {
      Header: 'Block',
      accessor: 'height',
    },
    {
      Header: 'Date',
      accessor: 'date',
      key: 'date',
      // render: (val) => new Date(val).toDateString,
    },
    {
      Header: 'Mint',
      accessor: 'mint',
    },
    // {
    //   Header: 'TXNs',
    //   accessor: 'tx',
    // },
    {
      Header: 'Channel',
      accessor: 'channel',
      Cell: (row) => {
        // console.log(row);
        return "channel";
        // const CHANNELS = { 0: 'Stake', 1: 'Prime', 2: 'Hash' };
        // return CHANNELS[chanId];
      },
      // sorter: (a, b) => a.channel - b.channel,
    },
  ];

  const testComponent = [
    <Table
      key={Math.random()}
      columns={blocksColumns}
      data={blocks100.result}
    />,
    <Loader key={Math.random()} />,
    <Loader type={TYPES.loaderType.dot} key={Math.random()} />,
    <Card type="small" key={Math.random()} />,
    <Text type="primary" key={Math.random()}>
      Hello World
    </Text>,
    <Button type="primary" key={Math.random()}>
      Open
    </Button>,
    <InfoCard
      type="block"
      data={blockData}
      key={Math.random()}></InfoCard>,
    // ];
    // return <div style={{ minWidth: '700px' }}>{testComponent}</div>;
    <Card
      type="basic"
      label="Label"
      sublabel="Sub-Label"
      title="999999999999"
      unit="unit"
      ticker="60s"
      key={Math.random()}
    />,
    <Card
      type="detail"
      label="Label"
      sublabel="Sub-Label"
      title="999999999999"
      unit="unit"
      ticker="60s"
      key={Math.random()}
    />,
    <Card
      type="market"
      label="Label"
      sublabel="Sub-Label"
      title="999999999999"
      unit="unit"
      ticker="60s"
      key={Math.random()}
    />,
    // <ChartsApex key={Math.random()} />,
    <ChartsApex key={Math.random()} />,
    <Loader key={Math.random()} />,
    <Loader key={Math.random()} type={TYPES.loaderType.dot} />,
    <Card key={Math.random()} type="small" />,
    <Text key={Math.random()} type="primary">
      Hello World
    </Text>,
    <Button key={Math.random()} type="primary" />,
  ];
  return (
    <div style={{ minWidth: '700px' }}>
      <h4>Total Test Components:{(testComponent || []).length}</h4>
      {(testComponent || []).map((component, idx) => (
        <Fragment key={idx}>
          {component}
          {testComponent.length - (idx + 1) ? <hr /> : <></>}
        </Fragment>
      ))}
      {/* {testComponent} */}
    </div>
  );
}

export default test;
