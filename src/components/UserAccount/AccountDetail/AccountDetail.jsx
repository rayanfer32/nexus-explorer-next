import styles from './AccountDetail.module.scss';
import QRCode from 'react-qr-code';
import CopyText from 'components/common/NE_CopyText';
import TYPES from 'types';
import { useRouter } from 'next/router';

export const AccountDetail = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className={styles.details}>
        <section className={styles.details__text}>
          <div>Account: {router.query.addr}</div>
          <div>
            Address: <CopyText value={data.address} />
          </div>
          <div>
            Owner: <CopyText value={data.owner} />
          </div>
          <div>
            Created On: {new Date(data.created * 1000).toLocaleString()}
          </div>
          <div>
            Last Modified: {new Date(data.modified * 1000).toLocaleString()}
          </div>
          <div>Name: {data.name}</div>
          <div>Stake Rate: {data.rate}</div>
          <div>Token Name: {data.token}</div>
          <div>Ticker: {data.ticker}</div>
        </section>
        <section className={styles.qrConatiner}>
          <div className={styles.qrCode}>
            <QRCode
              fgColor={TYPES.COLORS.NEXUS_BLUE}
              title={data.address}
              value={data.address || ''}
              level="L"
              size={200}
            />
          </div>
        </section>
      </div>
    </>
  );
};
