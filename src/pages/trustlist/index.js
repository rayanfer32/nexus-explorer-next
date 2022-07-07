import PageHeader from 'components/Header/PageHeader';
import Trustlist from 'components/Views/Trustlist';

export default function index() {
  return (
    <>
      <PageHeader page="Trustlist" />
      <Trustlist />
    </>
  );
}
