import styles from './SearchBar.module.scss';
import { Search_SVG_Icon } from 'assets/icons';

function SearchBar(props) {
  return (
    <div className={styles.searchBar}>
      <input
        type="search"
        results={5}
        value={props?.value}
        onChange={props?.onChange}
        placeholder={props?.placeholder}
        className={styles.searchInput}
        onKeyDown={props?.onKeyDown}
      />
      <button
        type="submit"
        onClick={props?.onSearch}
        className={styles.searchBtn}>
        <Search_SVG_Icon />
      </button>
    </div>
  );
}

export default SearchBar;
