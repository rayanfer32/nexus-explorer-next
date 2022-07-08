import { useNetwork } from 'hooks/useNetwork/useNetwork';
import React from 'react';
import { useQuery } from 'react-query';
import { DAO_AMBASSADORS } from 'types/DaoAccounts';
import { cls } from 'utils';
import styles from '../dao.module.scss';

export const AmbassadorDao = (props) => {
  const {} = props;
  const { getAccount } = useNetwork();
  const multiQuery = useQuery;

  // * make balance fetch for each dao account using useQuery hook and store it in an array
  const daoInfoArr = Object.entries(DAO_AMBASSADORS);
  const accountQuerys = daoInfoArr.map(([k, v]) =>
    multiQuery([v.audit], () => getAccount(v.audit))
  );

  return (
    <section className={cls(styles.container)}>
      <h1>Ambassador DAO</h1>
      {daoInfoArr.map(([daoKey, daoInfo], index) => (
        <div key={daoKey} className={cls(styles.block)}>
          <div>
            Balance: {accountQuerys[index]?.data?.balance.toFixed(2)}{' '}
            {accountQuerys[index]?.data?.ticker}
            <pre>DAO Info: {JSON.stringify(daoInfo, null, 2)}</pre>
          </div>
        </div>
      ))}
    </section>
  );
};
