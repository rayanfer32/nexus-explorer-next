import Card from '../..';
import PropTypes from 'prop-types';
import classes from '../DetailCard.module.scss';

export const Detail = ({ ...props }) => {
  return <Card>Detail</Card>;
};

Detail.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ticker: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
