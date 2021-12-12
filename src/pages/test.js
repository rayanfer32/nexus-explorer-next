import Loader from 'components/atoms/Loader';
import ChartsApex from 'components/Chart/ChartsApex';
import TYPES from 'types';

function test() {
  const testComponent = [
    <ChartsApex />,
    <Loader />,
    <Loader type={TYPES.loaderType.dot} />,
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
