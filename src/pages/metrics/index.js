import PageHeader from 'components/Header/PageHeader';
import Metrics from 'components/Metrics/Metrics';

export default function index() {
  return (
    <>
      <PageHeader page={'metrics'}></PageHeader>
      <Metrics />
    </>
  );
}
