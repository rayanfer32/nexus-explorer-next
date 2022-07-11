import Button from 'components/common/NE_Button';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import { cls, intlNum } from 'utils';
import styles from './dao.module.scss';
import { CgExternal } from 'react-icons/cg';

export const DaoInfo = (props) => {
  const { title, daoObject } = props;
  const { getAccount } = useNetwork();

  // * make balance fetch for each dao account using useQuery hook and store it in an array
  const multiQuery = useQuery;
  const daoInfoArr = Object.entries(daoObject);
  const accountQuerys = daoInfoArr.map(([, v]) =>
    multiQuery([v.audit, 'account'], () => getAccount(v.audit))
  );

  return (
    <section className={cls(styles.container)}>
      <h1>{title}</h1>
      {daoInfoArr.map(([daoKey, daoInfo], index) => (
        <div key={daoKey} className={cls(styles.block)}>
          <div className={styles.block__details}>
            <h3>
              <Link href={`/scan/${daoInfo.audit}`}>{daoInfo.audit}</Link>
            </h3>

            <h4>{daoInfo.desc} </h4>
            <Link href={`/scan/${daoInfo.audit}`} passHref>
              <a>
                Balance : {intlNum(accountQuerys[index]?.data?.balance)}{' '}
                {accountQuerys[index]?.data?.ticker}
                <CgExternal />
              </a>
            </Link>
            <div>Chair : {daoInfo.chair} </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={daoInfo.social.replace('@', 'https://t.me/')}>
              Social : {daoInfo.social} <CgExternal />
            </a>
          </div>
          <Link href={`/dao/invoices/${daoInfo.audit}`} passHref>
            <Button type="primary"> Check Invoices</Button>
          </Link>
        </div>
      ))}
    </section>
  );
};
