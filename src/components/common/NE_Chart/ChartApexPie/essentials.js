export const initialOptions = ({ labels, theme }) => ({
  chart: {
    background: 'rgba(0, 0, 0, 0)',
  },
  theme: {
    mode: theme,
  },
  labels: labels || [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
});
