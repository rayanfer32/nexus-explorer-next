import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import styles from './Table.module.scss';
import Pagination from 'components/common/NE_Pagination';

export default function Table({ columns, data = [], paginate = true }) {
  const tableInstance = useTable({ data, columns }, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const paginationControls = {
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
    handleStartOfPageClick: () => gotoPage(0),
    handlePreviousPageClick: () => previousPage(),
    handleNextPageClick: () => nextPage(),
    handleEndOfPageClick: () => gotoPage(pageCount - 1),
  };

  // if (data?.length === 0) {
  //   return <div className={styles.tableContainer}>No Records</div>;
  // }

  return (
    // apply the table props
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table} {...getTableProps()}>
          <thead className={styles.thead}>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                // eslint-disable-next-line react/jsx-key
                <tr
                  className={styles.tr}
                  {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      // eslint-disable-next-line react/jsx-key
                      <th
                        className={styles.th}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}>
                        {
                          // Render the header
                          column.render('Header')
                        }
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}

          <tbody className={styles.tbody} {...getTableBodyProps()}>
            {
              // Loop over the table rows
              (paginate ? page : rows).map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  // eslint-disable-next-line react/jsx-key
                  <tr className={styles.tr} {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <td className={styles.td} {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {data.length === 0 && (
          <div className={styles.noRecords}>No Records</div>
        )}
      </div>
      {pageCount > 1 && paginate && (
        <div style={{ marginBottom: '1rem' }}>
          <Pagination
            controls={paginationControls}
            isStaticPanination={paginate}
          />
        </div>
      )}
    </>
  );
}
