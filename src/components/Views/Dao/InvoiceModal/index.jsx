import nexus_blue64 from 'assets/icons/nexus_blue64.png';
import PushLink from 'components/common/NE_Link';
import Image from 'next/image';
import React from 'react';
import { BiLink, BiArrowBack } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import TYPES from 'types';
import { cls, intlNum, timestampToDate } from 'utils';
import { InvoiceStatus } from '../InvoiceStatus/invoiceStatus';
import styles from './invoiceModal.module.scss';

export function InvoiceModal(props) {
  const { onClose, data } = props;

  return (
    <section className={styles.backdrop}>
      <div className={styles.backdrop__action} onClick={onClose}></div>
      <InvoiceWithData data={data} onClose={onClose} {...props} />
    </section>
  );
}

export const InvoiceWithData = ({ data, onBack, onClose, isPage }) => {
  const { address, created, modified, owner, json } = data;
  const {
    account = 0,
    amount = 0,
    sender_detail = '',
    reference = '',
    description = '',
    status = '',
    recipient = '',
    items = [],
  } = json;
  return (
    <>
      {isPage && onBack && (
        <div className={styles.onclose_back} onClick={onBack}>
          <BiArrowBack />
          Back
        </div>
      )}
      <article className={cls(styles.modal, isPage && styles.page)}>
        {onClose && (
          <div className={styles.close} onClick={onClose}>
            <IoClose color={TYPES.COLORS.MARKET_RED} />
          </div>
        )}
        <div className={styles.content}>
          <header>
            <div className={styles.stamp}>
              <Image
                src={nexus_blue64}
                width={48}
                height={48}
                alt={'nexus logo'}
              />
              <div>
                <h1> Invoice Details</h1>
                <label className={styles.createdDate}>
                  Created on {timestampToDate(created)}
                </label>
              </div>
            </div>
            <div className={styles.dueStatus}>
              <label>
                <i>Modified on:</i> {timestampToDate(modified)}
              </label>
              <label className={styles.status}>
                <i>Status:</i> <InvoiceStatus status={status} />
              </label>
            </div>
          </header>
          <PushLink href={!isPage && `/scan?invoice=${address}`}>
            <i className={styles.address}>
              Address/InvoiceID: {address}
              {!isPage && <BiLink />}
            </i>
          </PushLink>
          <main className={styles.details}>
            <div className={styles.details__transaction}>
              <div>
                <i>From:</i>
                <div>
                  <p>{owner}</p>
                  <label>{sender_detail}</label>
                </div>
              </div>
              <div>
                <i>Recipient:</i>
                <p>{recipient}</p>
              </div>
              <div>
                <i>Account:</i>
                <p>{account}</p>
              </div>
            </div>
            <div className={styles.details__summary}>
              <h3>Summary</h3>
              {reference && (
                <p>
                  <i>Reference: </i>
                  {reference}
                </p>
              )}
              {description && (
                <p>
                  <i>Description: </i>
                  {description}
                </p>
              )}
            </div>
            <div className={styles.details__items}>
              <div className={cls(styles.item, styles.header)}>
                <i>Description</i>
                <i>Unit</i>
                <i>Unit Amount(NXS)</i>
              </div>
              {items.map((item, idx) => (
                <div key={idx} className={styles.item}>
                  <label>{item?.description}</label>
                  <label>{item.units}</label>
                  <label>{item?.unit_amount}</label>
                </div>
              ))}
              <div className={cls(styles.item, styles.total)}>
                <h3>Total Amount(NXS):</h3>
                <h3>{intlNum(amount)}</h3>
              </div>
            </div>
          </main>
        </div>
      </article>
    </>
  );
};
