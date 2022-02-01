import React from 'react';
import styles from './Pagination.module.scss';
import {
  BiChevronLeft,
  BiChevronRight,
  BiFirstPage,
  BiLastPage,
} from 'react-icons/bi';

function Pagination({ controls }) {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
  } = controls;

  return (
    <div className={styles.pagination}>
      <span className={styles.pagination__btn}>
        <button
          type="secondary"
          className={styles.pagination__btn__icon}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}>
          <BiFirstPage color="inherit" />
        </button>
        <button
          className={styles.pagination__btn__icon}
          type="secondary"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}>
          <BiChevronLeft color="inherit" />
        </button>
        <span className={styles.pagination__btn__page}>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          className={styles.pagination__btn__icon}
          type="secondary"
          onClick={() => nextPage()}
          disabled={!canNextPage}>
          <BiChevronRight color="inherit" />
        </button>
        <button
          className={styles.pagination__btn__icon}
          type="secondary"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}>
          <BiLastPage color="inherit" />
        </button>
      </span>
      <div className={styles.pagination__goToPage}>
        <span className={styles.pagination__goToPage__pageSelect}>
          Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            min={1}
            style={{ width: '100px' }}
          />
        </span>
        <select
          className={styles.pagination__goToPage__pageDropdown}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Pagination;
