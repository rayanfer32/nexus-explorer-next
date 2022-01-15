import { toTitleCase } from 'utils/converter';
import styles from './InfoCard.module.css';
import { middleElipsis } from 'utils/converter';
import { BiCopy } from 'react-icons/bi';

// const data = {
//   bits: '7c07227d',
//   channel: 2,
//   date: '2015-06-03 23:23:23 UTC',
//   difficulty: 8.970082,
//   hash: '00000000032d124cd960338bd530bed9c659453c9b7f180c9dde696b0c93a65be00687b1debf907e719ebb4e9416e0c7f157d51cab305ccc1ee7195fc8b68b51aaf288fc70fd472db092cb5fe3f64640500ad0baf3f11b9b3f8c5b1a8ef1cca9743957d445224aff121903d1b1bba3571a2e025582e686f09fab8466ffa9bfa4',
//   height: 283234,
//   merkleroot:
//     '47d90ee7aae286d375aedb8e533924ee681cec83affb41f127dad3d3021db87115f17f43b12f5a24298c5b531c5e6e9326cc42e6f04ffff1c429e8d5075b0b38',
//   mint: 55.638687,
//   nextblockhash:
//     'b5afafc878af8b29c80decc82709b29699a5e9a04a37ace9207ee1b93d2b76bf58dd49ddf8683f2854731a8d3f24b38a21eb2ac63fc7d27c0ebc3c9f0f85ee9e7586ff42ecb59e19e3899852700d4c1290073ec54d8cf0a848a8e1dba5ac51a62396f2dca6f5f6de0b007c35eea006e32194486fea2317f82aede4973cb3de8a',
//   nonce: 40059157,
//   previousblockhash:
//     '00000000042d662890e38b58d9fbc479cccc1d7bb2e237636ab4a318f493e33dbd023d0d74a6a6fd5a800cc910b673b5d1ebe358c795d206b62237b79ec82e770e530e961e96d4b56bd17c1d4fab82c9c31c1710007a9f8f0c0ea3b8d87f0440e8d8097853e1b16a6df161ecaf85e2462870118da9293a3f00823431baa21e49',
//   proofhash:
//     '00000000032d124cd960338bd530bed9c659453c9b7f180c9dde696b0c93a65be00687b1debf907e719ebb4e9416e0c7f157d51cab305ccc1ee7195fc8b68b51aaf288fc70fd472db092cb5fe3f64640500ad0baf3f11b9b3f8c5b1a8ef1cca9743957d445224aff121903d1b1bba3571a2e025582e686f09fab8466ffa9bfa4',
//   size: 812,
//   timestamp: 1433373803,
// };

export const InfoCard = (props) => {
  
  function handleCopy(value){
    navigator.clipboard.writeText(value);
    alert("Copied the text: " + value);
  }

  return props.type === 'block' ? (
    <div className={styles.container}>
      <h3>Block Details</h3>
      {Object.entries(props?.data).map(([key, value]) => {
        return (
          <div className={styles.row} key={Math.random()}>
            <div className={styles.rowKey}>{`${toTitleCase(key)}:`}</div>
            <span className={styles.rowValue}>
              {`${
                value.toString().length > 12 ? middleElipsis(value, 12) : value
              }`}{' '}
              <BiCopy onClick={() => handleCopy(value)} />
            </span>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default InfoCard;
