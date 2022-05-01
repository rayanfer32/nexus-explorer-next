import React, { useState } from 'react';
import styles from './Pagination.module.scss';
import {
  BiChevronLeft,
  BiChevronRight,
  BiFirstPage,
  BiLastPage,
} from 'react-icons/bi';

// ! will be deprecated soon.
export default function DynamicPagination({ controls }) {
  const [gotoPageTimer, setGotoPageTimer] = useState();

  const {
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    pageIndex,
    pageSize,
  } = controls;

  const dataPerPage = [10, 25, 50, 100];

  const handleStartOfPageClick = () => {
    gotoPage(0);
  };

  const handlePreviousPageClick = () => {
    gotoPage(pageIndex - 1);
  };

  const handleNextPageClick = () => {
    gotoPage(pageIndex + 1);
  };

  const handleEndOfPageClick = () => {
    gotoPage(pageCount - 1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const handleGotoPageInputChange = (e) => {
    clearTimeout(gotoPageTimer);

    setGotoPageTimer(
      setTimeout(() => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0;
        gotoPage(page);
      }, 1000)
    );
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
            Page{' '}
            <strong>
              {pageIndex + 1} {pageCount != Infinity && `of ${pageCount}`}
            </strong>
          </span>
          <button
            className={styles.pagination__btn__icon}
            type="secondary"
            onClick={handleNextPageClick}
            disabled={!canNextPage}>
            <BiChevronRight color="inherit" />
          </button>
          {pageCount != Infinity && (
            <button
              className={styles.pagination__btn__icon}
              type="secondary"
              onClick={handleEndOfPageClick}
              disabled={!canNextPage}>
              <BiLastPage color="inherit" />
            </button>
          )}
        </span>
        <div className={styles.pagination__goToPage}>
          <span className={styles.pagination__goToPage__pageSelect}>
            Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={handleGotoPageInputChange}
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
