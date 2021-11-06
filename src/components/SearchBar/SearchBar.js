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
        placeholder="Search by Address / Tx ID / Block Hash"
      />
      <button type="submit" onClick={props?.onSearch}>
        <Image src={SearchIcon} alt="search" className={styles.searchIcon} />
      </button>
    </div>
  );
}

export default SearchBar;
