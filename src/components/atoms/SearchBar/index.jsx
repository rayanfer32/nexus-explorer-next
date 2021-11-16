import SearchBar from './SearchBar';
import SearchBarLong from './SearchBarLong';

export default function Search(props) {
  if (props.type === 'long' || props.long === true)
    return <SearchBarLong {...props} />;
  return <SearchBar {...props} />;
}
