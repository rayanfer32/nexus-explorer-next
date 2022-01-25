import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styles from './Table.module.css';

export default function Table({ columns, data }) {
  const tableInstance = useTable({ data, columns }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    // apply the table props
    <table className={styles.table} {...getTableProps()}>
      <thead className={styles.thead}>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            // eslint-disable-next-line react/jsx-key
            <tr className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  // eslint-disable-next-line react/jsx-key
                  <th
                    className={styles.th}
                    {...column.getHeaderProps(column.getSortByToggleProps())}>
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
          rows.map((row) => {
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
  );
}
