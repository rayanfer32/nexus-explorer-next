import Card from '../..';
import PropTypes from 'prop-types';

export const Market = ({ ...props }) => {
  return <Card>market</Card>;
};

Market.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ticker: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
