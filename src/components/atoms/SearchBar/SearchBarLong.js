import styles from './SearchBar.module.css';
import SearchIcon from 'assets/icons/search.svg';
import Image from 'next/image';

function SearchBarLong(props) {
  return (
    <div className={[styles.searchBar, styles.searchBarLong].join(' ')}>
      <input
        type="search"
        results={5}
        value={props?.value}
        onChange={props?.onChange}
        placeholder="Search by Address / Tx ID / Block Hash"
        className={styles.searchLong}
      />
      <button
        type="submit"
        onClick={props?.onSearch}
        className={styles.searchLongBtn}>
        <Image src={SearchIcon} alt="search" className={styles.searchIcon} />
      </button>
    </div>
  );
}

export default SearchBarLong;
