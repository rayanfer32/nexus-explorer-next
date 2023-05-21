import { middleElipsis, toTitleCase } from 'utils/converter';
import styles from './InfoCard.module.scss';
import React, { Fragment, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import CopyText from '../NE_CopyText';

export const InfoCard = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(props.collapse);

  function InfoRow({ label, value }) {
    return (
      <div className={styles.row}>
        <div className={styles.rowKey}>{`${toTitleCase(label)}:`}</div>
        {value.toString().length > 25 ? (
          <CopyText value={value} />
        ) : (
          middleElipsis(value, 15)
        )}
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          maxHeight: isCollapsed ? '3.8rem' : '',
          marginBottom: '0.25rem',
        }}
        className={styles.container}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <h3>{`${toTitleCase(props.type)} ${
            props.data?.length ? `(${props.data?.length})` : ''
          }`}</h3>
          {props.collapse && (
            <span
              className={styles.collapseBtn}
              onClick={() => setIsCollapsed((prev) => !prev)}>
              {isCollapsed ? <FaCaretDown /> : <FaCaretUp />}
            </span>
          )}
        </div>

        {props.data &&
          Object.entries(props.data).map(([key, value]) => {
            if (Array.isArray(value)) {
              return (
                <InfoCard
                  key={`${key}-${value}`}
                  collapse={true}
                  type={key}
                  data={value}>
                  {value.map((item, index) => (
                    <InfoCard
                      collapse={true}
                      key={index}
                      type={(index + 1).toString()}
                      data={item}
                    />
                  ))}
                </InfoCard>
              );
            } else if (typeof value === 'object') {
              return (
                <InfoCard
                  key={Math.random()}
                  collapse={true}
                  type={isNaN(key) ? key : (parseInt(key) + 1).toString()}
                  data={value}
                />
              );
            }

            return <InfoRow key={Math.random()} label={key} value={value} />;
          })}

        {/* contracts inside the transaction */}
        <div style={{ display: 'none', flexDirection: 'row', gap: '1rem' }}>
          <div>
            {/* info cards of contracts */}
            {props.data?.contracts?.map((contract, index) => (
              <Fragment key={`contract-${index}`}>
                <hr />
                <InfoCard type="contract" data={contract} />
                {contract?.object && (
                  <InfoCard type="object" data={contract?.object} />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
