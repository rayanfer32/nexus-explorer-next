import PageHeader from 'components/Header/PageHeader';
import TransactionsView from 'components/Views/Transactions';

export default function Transactions() {
  return (
    <>
      <PageHeader page={'transactions'} />
      <TransactionsView />
    </>
  );
}
