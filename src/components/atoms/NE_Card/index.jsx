import { NE_SmallCard } from './NE_SmallCard';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = ({ type, ...props }) => {
  if (type === 'small') return <NE_SmallCard {...props} />;
  return (
    <section {...props} className={[props.className, styles['card']].join(' ')}>
      {props.children}
    </section>
  );
};

export default Card;
export { NE_SmallCard };

Card.propTypes = {
  type: PropTypes.oneOf(['default', 'small', 'detail']),
};
