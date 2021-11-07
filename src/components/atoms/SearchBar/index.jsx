import { useRef, useState } from 'react';
import styles from './SearchBar.module.css';
import searchBtn from 'assets/icons/search.svg';
import clearBtn from '../../../assets/icons/cross.svg';
import Image from 'next/dist/client/image';

function SearchBar() {
  const inputRef = useRef();

  const [clearBtnVisibility, setClearBtnVisibility] = useState('hidden');

  function handleChange() {
    if (inputRef.current.value != '') {
      setClearBtnVisibility('visible');
    } else {
      setClearBtnVisibility('hidden');
    }
  }

  function clearInput() {
    inputRef.current.value = '';
    setClearBtnVisibility('hidden');
  }

  return (
    <div className={styles.searchbar}>
      <div className={styles.button}>
        <Image alt="Search" src={searchBtn}></Image>
      </div>
      <div
        className={styles.clearBtn}
        style={{ visibility: clearBtnVisibility }}>
        <Image src={clearBtn} alt="Clear" onClick={clearInput}></Image>
      </div>
      <input
        ref={inputRef}
        onChange={handleChange}
        className={styles.text}
        placeholder="Search by Address / Tx ID / Block Hash"
      />
    </div>
  );
}

export default SearchBar;
