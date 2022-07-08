import React from 'react';
import { cls } from 'utils/classnames';
import styles from './ambassadorDao.module.scss';

const AmbassadorDao = (props) => {
  const {} = props;
  return (
    <section className={cls(styles.container)}>
      <h1>Ambassador DAO</h1>
      <div className={cls(styles.block)}></div>
    </section>
  );
};

export default AmbassadorDao;
