import { useEffect, useRef, useState } from 'react';
import contracts24h from 'assets/data/contracts24h';
import styles from './ChartsApex.module.css';

// https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic';
import { useDarkMode } from 'hooks';
import { useAppContext } from 'contexts/AppContext';
import TYPES from 'types';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ChartsApex() {
  const { sharedState } = useAppContext();

  const [isDarkMode] = useDarkMode();
  let apexChartRef = useRef();

  // const series = [
  //   118, 111, 99, 116, 113, 92, 109, 161, 179, 164, 174, 128, 477, 104, 85, 101,
  //   116, 109, 86, 119, 80, 112, 480, 82,
  // ];

  const series = [];
  const generatePrevTimes = () => {
    const _prevTimes = [];
    for (let i = 24; i > 0; i--) {
      let d = new Date(new Date().getTime() - i * 60 * 60 * 1000).toString();
      // console.log(d);
      _prevTimes.push(d);
    }
    return _prevTimes;
  };

  let prevTimes = generatePrevTimes();
  // console.log(prevTimes);

  let [chartState, setChartState] = useState({
    options: {
      chart: {
        id: 'tx',
        zoom: {
          enabled: false,
        },
        background: 'rgba(0, 0, 0, 0)',
      },
      theme: {
        mode: isDarkMode ? TYPES.theme.dark : TYPES.theme.light,
      },
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: isDarkMode
            ? [TYPES.colors.skyBlue]
            : [TYPES.colors.nexusBlue],
        },
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
      colors: isDarkMode ? [TYPES.colors.skyBlue] : [TYPES.colors.nexusBlue],
      grid: {
        show: false,
      },
      title: {
        text: 'Transaction History - 24H',
        align: 'left',
        style: {
          fontFamily: 'Lato',
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
        categories: prevTimes,
        labels: {
          datetimeUTC: false,
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    },
    series: [
      {
        name: 'Transactions',
        data: series,
      },
    ],
  });

  const updateChart = () => {
    const newSeries = [];
    const step = Math.floor(contracts24h.contracts.length / 24);
    for (let i = 0; i < contracts24h.contracts.length - step; i += step) {
      newSeries.push(
        contracts24h.contracts.slice(i, i + step).reduce((a, b) => a + b, 0)
      );
    }
    const newXAxisData = [];
    for (let i = 0; i < contracts24h.datestamps.length - step; i += step) {
      newXAxisData.push(contracts24h.datestamps[Math.floor(i + step / 2)]);
    }

    setChartState((prev) => {
      prev.series[0].data = newSeries;
      prev.options.xaxis.categories = newXAxisData;
      return { ...prev };
    });
  };

  useEffect(() => {
    updateChart();
  }, []);

  // check appcontext update
  useEffect(() => {
    // get dark mode state
    const isDark = sharedState.theme === TYPES.theme.dark;
    // update chart theme mode
    setChartState((prev) => {
      prev.options.theme.mode = sharedState.theme;
      // update colors property of the chart
      prev.options.colors = isDark
        ? [TYPES.colors.skyBlue]
        : [TYPES.colors.nexusBlue];
      // update fill color of the chart
      prev.options.fill.gradient.gradientToColors = isDark
        ? [TYPES.colors.skyBlue]
        : [TYPES.colors.nexusBlue];
      return { ...prev };
    });
  }, [sharedState.theme]);

  // Bug tribute: chart not updating when updating state (fixed with adding random key)
  // https://github.com/reactchartjs/react-chartjs-2/issues/90
  return (
    <Chart
      className={styles.container}
      ref={apexChartRef}
      key={Math.random()}
      options={chartState.options}
      series={chartState.series}
      height={190}
      width={'100%'}
      type="area"
    />
  );
}

export default ChartsApex;
