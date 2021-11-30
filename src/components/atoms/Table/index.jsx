// import React from "react"
const Table = ({ data }) => {
  //   return <pre>{JSON.stringify(data, null, 2)}</pre>;
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data.result[0]).map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.result.map((item) => (
          <tr key={item.address}>
            {Object.entries(item).map(([index, val]) => (
              <td key={index}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
