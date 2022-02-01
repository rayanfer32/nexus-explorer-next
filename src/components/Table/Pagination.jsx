import React from 'react';
import styles from './Pagination.module.scss';
import Button from 'components/atoms/NE_Button';

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
      <Button
        type="secondary"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}>
        {'<<'}
      </Button>{' '}
      <Button
        type="secondary"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}>
        {'<'}
      </Button>{' '}
      <Button
        type="secondary"
        onClick={() => nextPage()}
        disabled={!canNextPage}>
        {'>'}
      </Button>{' '}
      <Button
        type="secondary"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}>
        {'>>'}
      </Button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
      <select
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
  );
}

export default Pagination;
