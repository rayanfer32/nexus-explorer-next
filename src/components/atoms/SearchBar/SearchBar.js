import styles from './SearchBar.module.css';
import SearchIcon from 'assets/icons/search.svg';
import Image from 'next/image';

function SearchBar(props) {
  return (
    <div className={styles.searchBar}>
      <input
        type="search"
        results={5}
        value={props?.value}
        onChange={props?.onChange}
        placeholder={props?.placeholder}
      />
      <button type="submit" onClick={props?.onSearch}>
        <Image
          src={SearchIcon}
          alt="search"
          className={styles.searchIcon}
          width="24"
          height="24"
        />
      </button>
    </div>
  );
}

export default SearchBar;
