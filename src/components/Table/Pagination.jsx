import React from 'react';
import styles from './Pagination.module.scss';
import {
  BiChevronLeft,
  BiChevronRight,
  BiFirstPage,
  BiLastPage,
} from 'react-icons/bi';

// ! will be deprecated soon.
function Pagination({ controls }) {
  const {
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
  } = controls;

  const dataPerPage = [10, 25, 50, 100];

  const handleStartOfPageClick = () => {
    gotoPage(0);
  };

  const handlePreviousPageClick = () => {
    previousPage();
  };

  const handleNextPageClick = () => {
    nextPage();
  };

  const handleEndOfPageClick = () => {
    gotoPage(pageCount - 1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <>
      <div className={styles.pagination}>
        <span className={styles.pagination__btn}>
          <button
            type="secondary"
            className={styles.pagination__btn__icon}
            onClick={handleStartOfPageClick}
            disabled={!canPreviousPage}>
            <BiFirstPage color="inherit" />
          </button>
          <button
            className={styles.pagination__btn__icon}
            type="secondary"
            onClick={handlePreviousPageClick}
            disabled={!canPreviousPage}>
            <BiChevronLeft color="inherit" />
          </button>
          <span className={styles.pagination__btn__page}>
            Page
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>
          </span>
          <button
            className={styles.pagination__btn__icon}
            type="secondary"
            onClick={handleNextPageClick}
            disabled={!canNextPage}>
            <BiChevronRight color="inherit" />
          </button>
          <button
            className={styles.pagination__btn__icon}
            type="secondary"
            onClick={handleEndOfPageClick}
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
              max={pageCount}
              style={{ width: '100px' }}
            />
          </span>
          <select
            className={styles.pagination__goToPage__pageDropdown}
            value={pageSize}
            onChange={handlePageSizeChange}>
            {dataPerPage.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Pagination;
