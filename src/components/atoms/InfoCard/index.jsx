import { toTitleCase } from 'utils/converter';
import styles from './InfoCard.module.css';
import { middleElipsis } from 'utils/converter';
import { BiClipboard, BiCopy, BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { handleCopy } from 'utils/helper';
import { useState, useEffect } from 'react';
import Toast from '../..//Toast';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export const InfoCard = (props) => {
  const [toastList, setToastList] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(props.collapse);

  function InfoRow({ label, value }) {
    return (
      <div className={styles.row}>
        <div className={styles.rowKey}>{`${toTitleCase(label)}:`}</div>
        <span data-copy={value} className={styles.rowValue}>
          {`${value.toString().length > 12 ? middleElipsis(value, 12) : value}`}
          <BiCopy
            onClick={() => {
              handleCopy(value);
              setToastList((prev) => {
                return [
                  ...prev,
                  {
                    message: `Copied ${value}`,
                    type: 'success',
                    icon: <BiClipboard color="inherit" />,
                  },
                ];
              });
            }}
          />
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        style={{ maxHeight: isCollapsed ? '3.8rem' : '' , marginBottom: "0.25rem"}}
        className={styles.container}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <h3>{toTitleCase(props.type)}</h3>
          {props.collapse && (
            <span onClick={() => setIsCollapsed((prev) => !prev)}>
              {isCollapsed ? <FaCaretDown /> : <FaCaretUp />}
            </span>
          )}
        </div>

        {Object.entries(props?.data).map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <InfoCard collapse={true} type={key} data={value}>
                {value.map((item, index) => (
                  <InfoCard
                    collapse={true}
                    key={Math.random()}
                    type={(index + 1).toString()}
                    data={item}
                  />
                ))}
              </InfoCard>
            );
          } else if (typeof value === 'object') {
            console.log()
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
              <>
                <hr />
                <InfoCard
                  key={`contract-${index}`}
                  type="contract"
                  data={contract}
                />
                {contract?.object && (
                  <InfoCard type="object" data={contract?.object} />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      <Toast toastList={toastList} />
    </>
  );
};

export default InfoCard;
