import Table from 'components/Table/Table';
import styles from './TransactionDetails.module.scss';
import Loader from 'components/atoms/NE_Loader';

export const TransactionDetails = ({
  isLoading = false,
  columns,
  data = [],
}) => {
  const LoaderDiv = () => (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '200px',
        margin: 'auto',
      }}>
      <Loader type="circle" size="5rem" />
    </div>
  );
  return (
    <>{isLoading ? <LoaderDiv /> : <Table columns={columns} data={data} />}</>
  );
};
