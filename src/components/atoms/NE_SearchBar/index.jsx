import SearchBar from './SearchBar';
import PropTypes from 'prop-types';

Search.propTypes = {
  type: PropTypes.oneOf(['long']),
  long: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSearch: PropTypes.func,
};

export default function Search(props) {
  function handleOnKeyDown(e) {
    if (e.key === 'Enter') {
      props.onSearch();
    }
  }

  return <SearchBar {...props} onKeyDown={handleOnKeyDown} />;
}
