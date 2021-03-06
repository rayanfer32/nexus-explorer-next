import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDarkMode } from 'hooks';
import TYPES from 'types';
import useWindowSize from 'hooks/useWindowSize/useWindowSize';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import styles from './ChartsApex.module.scss';

function ApexPie({ series, options, labels, ...rest }) {
  const windowSize = useWindowSize();

  const [isDarkMode] = useDarkMode();
  const [_series, setSeries] = useState(series);
  const [_options, setOptions] = useState(
    options || {
      chart: {
        background: 'rgba(0, 0, 0, 0)',
      },
      theme: {
        mode: isDarkMode ? TYPES.THEME.DARK : TYPES.THEME.LIGHT,
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
    }
  );

  // * update internal state when props udpate
  useEffect(() => {
    setSeries(series);
    if (options) {
      setOptions(options);
    }
  }, [series, options]);

  // * updates the chart when dark mode changes
  function updateChart() {
    let newOptions = { ..._options };
    newOptions.theme.mode = isDarkMode ? TYPES.THEME.DARK : TYPES.THEME.LIGHT;
    setOptions(newOptions);
  }

  // * update chart on theme change
  useEffect(() => {
    updateChart();
  }, [isDarkMode]);

  return (
    <Chart
      className={styles.chart__donut}
      key={_options.theme.mode}
      options={_options}
      series={_series}
      type="donut"
      width={400}
      height={windowSize.width < 500 ? 500 : undefined} // for mobile only
      {...rest}
    />
  );
}

export default ApexPie;
