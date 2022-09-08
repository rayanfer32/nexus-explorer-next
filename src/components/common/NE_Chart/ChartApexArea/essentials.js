export const initialEssentials = ({ options = {}, series = [] }) => ({
  options: {
    grid: {
      show: false,
    },
    title: {
      text: 'Transaction History',
      align: 'left',
      style: {
        fontFamily: 'inherit',
        fontWeight: 'normal',
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      categories: [],
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    ...options,
  },
  series: [
    {
      name: 'Contracts',
      data: [],
    },
    ...series,
  ],
});
