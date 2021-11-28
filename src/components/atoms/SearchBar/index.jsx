import SearchBar from './SearchBar';
import SearchBarLong from './SearchBarLong';

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
