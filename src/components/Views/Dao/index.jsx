import Button from 'components/common/NE_Button';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import { cls, intlNum, toTitleCase } from 'utils';
import styles from './dao.module.scss';

export const DaoInfo = (props) => {
  const { title, daoObject } = props;
  const { getAccount } = useNetwork();

  // * make balance fetch for each dao account using useQuery hook and store it in an array
  const multiQuery = useQuery;
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
            <p>
              <h3>{daoInfo.audit} </h3>
              <h4>{daoInfo.desc} </h4>
              <div>Chair : {daoInfo.chair} </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={daoInfo.social.replace('@', 'https://t.me/')}>
                Social : {daoInfo.social}{' '}
              </a>
              <div>
                Balance : {intlNum(accountQuerys[index]?.data?.balance)}{' '}
                {accountQuerys[index]?.data?.ticker}
              </div>
            </p>
          </div>
          <Link href={`/dao/invoices/${daoInfo.audit}`}>
            <Button type="primary"> Check Invoices</Button>
          </Link>
        </div>
      ))}
    </section>
  );
};
