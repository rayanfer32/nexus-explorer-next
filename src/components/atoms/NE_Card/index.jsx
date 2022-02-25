import { NE_SmallCard } from './NE_SmallCard';
import { NE_DetailCard } from './NE_DetailCard';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import TYPES from 'types';

const Card = ({ type = 'default', ...props }) => {
  console.log(type);
  if (type === 'small') return <NE_SmallCard {...props} />;
  if (type === 'detail' || type === 'market' || type === 'basic')
    return <NE_DetailCard type={type} {...props} />;

  return (
    <section {...props} className={[props.className, styles['card']].join(' ')}>
      {props.children}
      <div
        className={[styles['card-live-state'], 'live-color'].join(' ')}></div>
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
export { NE_SmallCard, NE_DetailCard };

Card.propTypes = {
  type: PropTypes.oneOf(['default', 'small', 'basic', 'detail', 'market']),
};
