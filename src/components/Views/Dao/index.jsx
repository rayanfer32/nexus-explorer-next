import Button from 'components/common/NE_Button';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import React from 'react';
import { useQuery } from 'react-query';
import { cls } from 'utils';
import styles from './dao.module.scss';

export const DaoInfo = (props) => {
  const { title, daoObject } = props;
  const { getAccount } = useNetwork();
  const multiQuery = useQuery;

  // * make balance fetch for each dao account using useQuery hook and store it in an array
  const daoInfoArr = Object.entries(daoObject);
  const accountQuerys = daoInfoArr.map(([k, v]) =>
    multiQuery([v.audit, 'account'], () => getAccount(v.audit))
  );

  return (
    <section className={cls(styles.container)}>
      <h1>{title}</h1>
      {daoInfoArr.map(([daoKey, daoInfo], index) => (
        <div key={daoKey} className={cls(styles.block)}>
          <div>
            Balance: {accountQuerys[index]?.data?.balance.toFixed(2)}{' '}
            {accountQuerys[index]?.data?.ticker}
            <pre>DAO Info: {JSON.stringify(daoInfo, null, 2)}</pre>
          </div>
          <Button type="primary">Check Invoices</Button>
        </div>
      ))}
    </section>
  );
};
