import SearchBar from './SearchBar';
import SearchBarLong from './SearchBarLong';

import PropTypes from 'prop-types';

SearchBar.propTypes = {
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
      console.log(e.target.value);
      props.onSearch();
    }
  }

  if (props.type === 'long' || props.long === true)
    return <SearchBarLong {...props} onKeyDown={handleOnKeyDown} />;
  return <SearchBar {...props} onKeyDown={handleOnKeyDown} />;
}
