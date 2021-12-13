import ASSESTS from 'assets';
import Card from '..';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './SmallCard.module.scss';

export const NE_SmallCard = (props) => {
  return (
    <Card className={styles['card-small']}>
      <div className={styles['card-body']}>
        <div className={styles['card-body-above']}>
          <h4
            onClick={props.onClickLabel}
            className={!!props.onClickLabel && styles['hover']}>
            {props.label}
          </h4>
          <label>{props.sublabel}</label>
        </div>
        <div className={styles['card-body-below']} onClick={props.onClick}>
          {props.text && <label data-right>{props.text}</label>}
          <h1 className={!!props.onClick && styles['hover']}>{props.title}</h1>
          {props.unit && <label data-left>{props.unit}</label>}
        </div>
      </div>
      <div className={styles['card-icon']}>
        <Image
          alt="nexus globe"
          src={ASSESTS.ICON.NEXUS.BLUE}
          width={64}
          height={64}
        />
      </div>
    </Card>
  );
};

NE_SmallCard.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string,
  unit: PropTypes.string,
  onClick: PropTypes.func,
  onClickLabel: PropTypes.func,
};
