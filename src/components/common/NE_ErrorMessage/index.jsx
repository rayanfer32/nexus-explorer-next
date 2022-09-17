import { cls } from 'utils';
import styles from './ErrorMessage.module.scss';
import Image from 'next/image';
import Billy from 'assets/images/error-bill.svg';
import Logger from 'utils/customLog';

export default function ErrorMessage({ error }) {
  const { code = '', message = '' } = error;
  Logger.error(error);
  return (
    <div className={cls(styles['error-container'])}>
      <Image src={Billy} alt={code} loading="lazy" />
      <div>
        <p className={styles['error-code']}>
          code: <span>{code}</span>
        </p>
        <p className={styles['error-message']}>{message}</p>
      </div>
    </div>
  );
}
