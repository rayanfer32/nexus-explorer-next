import Card from '..';
import PropTypes from 'prop-types';
import styles from './CompactCard.module.scss';
import { Nexus_SVG_Icon } from 'assets/icons';
import TYPES from 'types';

/**
 * Compact card component with icon
 *
 * @param {string} label - Card label
 * @param {string} sublabel - Card sublabel
 * @param {string} value - Card value
 * @param {string} unit - Card unit
 * @param {string} text - Card value label
 * @param {JSX.Element} icon - Card icon
 * @param {Function} onClick - Card onClick function for card value
 * @param {Function} onClickLabel - Card onClick function for card label
 */
export const NE_CompactCard = (props) => {
  const Icon = (data) => props.icon || <Nexus_SVG_Icon {...data} />;
  return (
    <Card className={styles['card-compact']}>
      <div className={styles['card-body']}>
        <div className={styles['card-body-upper-part']}>
          <h4
            onClick={props.onClickLabel}
            className={!!props.onClickLabel && styles['hover']}
            title={`${props.label}`}>
            {props.label}
          </h4>
          <label title={`${props.sublabel}`}>{props.sublabel}</label>
        </div>
        <div
          className={styles['card-body-lowwer-part']}
          onClick={props.onClick}>
          {props.text && <label data-right>{props.text}</label>}
          <h3
            className={!!props.onClick && styles['hover']}
            title={`Value is ${props.value}`}>
            {props.value}
          </h3>
          {props.unit && <label data-left>{props.unit}</label>}
        </div>
      </div>
      <div className={styles['card-icon']}>
        <Icon fill={TYPES.COLORS.TRANSPARENT} color={TYPES.COLORS.NEXUS_BLUE} />
      </div>
    </Card>
  );
};

NE_CompactCard.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string,
  unit: PropTypes.string,
  onClick: PropTypes.func,
  onClickLabel: PropTypes.func,
  icon: PropTypes.element,
};
