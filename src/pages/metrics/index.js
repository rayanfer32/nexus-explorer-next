import PageHeader from 'components/Header/PageHeader';
import Metrics from 'components/Views/Metrics';

export default function index() {
  return (
    <>
      <PageHeader page={'metrics'}></PageHeader>
      <Metrics />
    </>
  );
}
