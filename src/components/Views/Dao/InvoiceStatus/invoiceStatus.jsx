import { cls } from 'utils';
import styles from './invoiceStatus.module.scss';

export const InvoiceStatus = ({ status = '' }) => {
  return (
    <div className={cls(styles.invoiceStatus, styles[status.toLowerCase()])}>
      {status}
    </div>
  );
};
