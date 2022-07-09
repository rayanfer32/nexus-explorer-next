import nexus_blue64 from 'assets/icons/nexus_blue64.png';
import Image from 'next/image';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import TYPES from 'types';
import { cls } from 'utils';
import { InvoiceStatus } from '../InvoiceStatus/invoiceStatus';
import styles from './invoiceModal.module.scss';

export function InvoiceModal(props) {
  const { onClose, data } = props;
  return (
    <section className={styles.backdrop} onClick={onClose}>
      <article className={styles.modal}>
        <div className={styles.close} onClick={onClose}>
          <IoClose color={TYPES.COLORS.MARKET_RED} />
        </div>
        <div className={styles.content}>
          <header>
            <div className={styles.stamp}>
              <Image
                src={nexus_blue64}
                width={48}
                height={48}
                layout={'fixed'}
                alt={'nexus logo'}
              />
              <div>
                <h1> Invoice Details</h1>
                <label className={styles.createdDate}>
                  Created on 12/12/1212
                </label>
              </div>
            </div>
            <div className={styles.dueStatus}>
              <label>
                <i>Modified on:</i> 12/12/2121
              </label>
              <label className={styles.status}>
                <i>Status:</i> <InvoiceStatus status={'paid'} />
              </label>
            </div>
          </header>
          <main className={styles.details}>
            <div className={styles.details__transaction}>
              <div>
                <i>From:</i>
                <div>
                  <p>{}</p>
                  <label>name</label>
                </div>
              </div>
              <div>
                <i>Recipient:</i>
                <div>
                  <p>address</p>
                  <label>name</label>
                </div>
              </div>
              <div>
                <i>Account:</i>
                <p>address</p>
              </div>
            </div>
            <div className={styles.details__summary}>
              <h3>Summary</h3>
              <p>
                <i>Reference:</i>
              </p>
              <p>
                <i>Description:</i>
              </p>
            </div>
            <div className={styles.details__items}>
              <div className={cls(styles.item, styles.header)}>
                <i>Description</i>
                <i>Unit</i>
                <i>Unit Amount(NXS)</i>
              </div>
              <div className={styles.item}>
                <label>Lorem ipsum dolor sit amet.</label>
                <label>1000</label>
                <label>121212</label>
              </div>
              <div className={cls(styles.item, styles.total)}>
                <h3>Total Amount(NXS):</h3>
                <h2>43434</h2>
              </div>
            </div>
          </main>
        </div>
      </article>
    </section>
  );
}
