import Button from 'components/atoms/NE_Button';
import Card from 'components/atoms/NE_Card';
import Loader from 'components/atoms/NE_Loader';
import Text from 'components/atoms/NE_Text';
import ChartsApex from 'components/Chart/ChartsApex';
import TYPES from 'types';
import { Fragment } from 'react';

function test() {
  const testComponent = [
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
    </div>
  );
}

export default test;
