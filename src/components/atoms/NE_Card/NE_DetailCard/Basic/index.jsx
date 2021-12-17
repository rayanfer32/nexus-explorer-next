import Card from '../..';
import PropTypes from 'prop-types';
import classes from '../DetailCard.module.scss';
import styles from './Basic.module.scss';

export const Basic = ({ ...props }) => {
  return <Card>Basic</Card>;
};

Basic.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ticker: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
