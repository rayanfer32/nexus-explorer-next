import styles from './UserAccount.module.scss';
import { AccountDetail } from './AccountDetail';
import { AccountInfo } from './AccountInfo';
import { TransactionDetails } from './TransactionDetails';
import { toTitleCase } from 'utils/converter';

export default function UserAccount({ type, data }) {
  return (
    <div className={styles.page}>
      {/* Account info  */}
      <h3>{toTitleCase(type)} Info</h3>
      <AccountInfo data={data} />

      {/* Account detials */}
      <h3>{toTitleCase(type)} Details</h3>
      <AccountDetail data={data} />

      {/* Transection detail table */}
      <h3>Transaction Details</h3>
      <TransactionDetails type={type} data={data} />

      {/* {isDev && rawInfo} */}
    </div>
  );
}
