import Card from 'components/atoms/NE_Card';
import Loader from 'components/atoms/NE_Loader';
import Text from 'components/atoms/NE_Text';
import ChartsApex from 'components/Chart/ChartsApex';
import TYPES from 'types';

function test() {
  const testComponent = [
    <Loader />,
    <Loader type={TYPES.loaderType.dot} />,
    <Card type="small" />,
    <Text type="primary">Hello World</Text>,
  ];
  return (
    <div style={{ minWidth: '700px' }}>
      <h4>Total Test Components:{(testComponent || []).length}</h4>
      {(testComponent || []).map((component, idx) => (
        <>
          {component}
          {testComponent.length - (idx + 1) ? <hr /> : <></>}
        </>
      ))}
    </div>
  );
}

export default test;
