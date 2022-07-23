import { NE_CompactCard } from './NE_CompactCard';
import { NE_SmallCard } from './NE_SmallCard';
import { NE_DetailCard } from './NE_DetailCard';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import TYPES from 'types';
import { cls } from 'utils';

const Card = ({ type = 'default', ...props }) => {
  if (type === 'small') return <NE_SmallCard {...props} />;
  if (type === 'compact') return <NE_CompactCard {...props} />;
  if (type === 'market' || type === 'basic')
    return <NE_DetailCard type={type} {...props} />;

  return (
    <section {...props} className={cls(props.className, styles['card'])}>
      {props.children}
      <div className={cls(styles['card-live-state'], 'live-color')}></div>
      <style jsx>{`
        .live-color {
          background-color: ${props.isLive
            ? TYPES.COLORS.MARKET_GREEN
            : TYPES.COLORS.TRANSPARENT};
        }
      `}</style>
    </section>
  );
};

export default Card;
export { NE_SmallCard, NE_DetailCard, NE_CompactCard };

Card.propTypes = {
  type: PropTypes.oneOf(['default', 'small', 'basic', 'compact', 'market']),
};
