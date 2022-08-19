import GlobalNamesView from 'components/Views/GlobalNames';
import PageHeader from 'components/Header/PageHeader';

export default function GlobalNames() {
  return (
    <>
      <PageHeader page={'GLOBALNAMES'} />
      <GlobalNamesView />
    </>
  );
}
