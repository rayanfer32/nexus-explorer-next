import PageHeader from 'components/Header/PageHeader';
import NamespacesView from 'components/Views/Namespaces';

export default function Namespaces() {
  return (
    <>
      <PageHeader page={'namespaces'} />
      <NamespacesView />
    </>
  );
}
