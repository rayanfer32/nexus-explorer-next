import styles from './Pagination.module.scss';
import {
  BiChevronLeft,
  BiChevronRight,
  BiFirstPage,
  BiLastPage,
} from 'react-icons/bi';
import { debounce } from 'utils/common';

export const Pagination = ({ controls, isStaticPanination }) => {
  const {
    pageOptions,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    pageIndex,
    pageSize,
    handleStartOfPageClick,
    handlePreviousPageClick,
    handleNextPageClick,
    handleEndOfPageClick,
  } = controls;

  const currentPage = isStaticPanination
    ? ` ${pageIndex + 1} of ${pageOptions.length}`
    : `${pageIndex + 1} ${pageCount != Infinity && `of ${pageCount}`}`;
  const defaultPageNumber = pageIndex + 1;
  const totalPages = pageCount;
  const dataPerPage = [10, 20, 30, 40, 50];
  const _isStaticPanination = isStaticPanination ? true : pageCount != Infinity;

  const handleGotoPageInputChange = (e) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    debounce(gotoPage(page), 1000);
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
            <strong>{currentPage}</strong>
          </span>
          <button
            className={styles.pagination__btn__icon}
            type="secondary"
            onClick={handleNextPageClick}
            disabled={!canNextPage}>
            <BiChevronRight color="inherit" />
          </button>
          {_isStaticPanination && (
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
            Go to page:
            <input
              type="number"
              defaultValue={defaultPageNumber}
              onChange={handleGotoPageInputChange}
              min={1}
              max={totalPages}
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
};

export default Pagination;
