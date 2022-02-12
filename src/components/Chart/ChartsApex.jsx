import { useEffect, useRef, useState } from 'react';
// import contracts24h from 'assets/data/contracts24h';
import styles from './ChartsApex.module.css';

// https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic';
import { useDarkMode } from 'hooks';
import { useAppContext } from 'contexts/AppContext';
import Shimmer from 'components/atoms/NE_Shimmer';
import TYPES from 'types';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { useQuery } from 'react-query';
import { useNetwork } from 'hooks/useNetwork/useNetwork';

function ChartsApex() {
  const { sharedState } = useAppContext();
  const [isDarkMode] = useDarkMode();

  // * fetch the blocks first and extract the total number of contracts inside the trasactions
  const [limit, setLimit] = useState(2 * 60);

  const { network, getRecentBlocks } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['charting', limit, network.name],
    () => getRecentBlocks(limit)
  );

  let [chartState, setChartState] = useState({
    options: {
      chart: {
        id: 'tx_chart',

        background: 'rgba(0, 0, 0, 0)',
        toolbar: {
          show: true,
          offsetX: -48,
          offsetY: 8,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            customIcons: [
              {
                // icon: `<img src="/nexus-nxs-logo.svg" width="24" />`,
                icon: `2H`,
                index: 2,
                title: '2H',
                class: 'custom-icon',
                click: (chart, options, e) => {
                  setLimit(2 * 60);
                },
              },
              {
                icon: '6H',
                index: 3,
                title: '6H',
                class: 'custom-icon',
                click: (chart, options, e) => {
                  setLimit(6 * 60);
                },
              },
              {
                icon: '12H',
                index: 4,
                title: '12H',
                class: 'custom-icon',
                click: (chart, options, e) => {
                  setLimit(12 * 60);
                },
              },
              {
                icon: '1D',
                index: 5,
                title: '24H',
                class: 'custom-icon',
                click: (chart, options, e) => {
                  setLimit(24 * 60);
                },
              },
            ],
          },
        },
      },
      theme: {
        mode: isDarkMode ? TYPES.THEME.DARK : TYPES.THEME.LIGHT,
      },
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: isDarkMode
            ? [TYPES.COLORS.SKY_BLUE]
            : [TYPES.COLORS.NEXUS_BLUE],
        },
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
      colors: isDarkMode ? [TYPES.COLORS.SKY_BLUE] : [TYPES.COLORS.NEXUS_BLUE],
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
    },
    series: [
      {
        name: 'Contracts',
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (data) {
      let _dateStamps = [];
      let _contracts = [];
      data.map((block) => {
        _dateStamps.push(block.date);
        let _contractsLengths = block.tx.map((tx) => {
          return tx?.contracts?.length || tx?.inputs?.length;
        });
        _contracts.push(_contractsLengths.reduce((a, b) => a + b, 0));
      });

      setChartState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: { ...prev.options.xaxis, categories: _dateStamps },
        },
        series: [
          {
            name: 'Contracts',
            data: _contracts,
          },
        ],
      }));
    }
  }, [data]);

  // check appcontext update
  useEffect(() => {
    // get dark mode state
    const isDark = sharedState.theme === TYPES.THEME.DARK;
    // update chart theme mode
    setChartState((prev) => {
      prev.options.theme.mode = sharedState.theme;
      // update colors property of the chart
      prev.options.colors = isDark
        ? [TYPES.COLORS.SKY_BLUE]
        : [TYPES.COLORS.NEXUS_BLUE];
      // update fill color of the chart
      prev.options.fill.gradient.gradientToColors = isDark
        ? [TYPES.COLORS.SKY_BLUE]
        : [TYPES.COLORS.NEXUS_BLUE];
      return { ...prev };
    });
  }, [sharedState.theme]);

  if (isLoading) return <Shimmer width="100%" height="12.5rem" />;

  // Bug tribute: chart not updating when updating state (fixed with adding random key)
  // https://github.com/reactchartjs/react-chartjs-2/issues/90
  return (
    <Chart
      className={styles.container}
      key={chartState.options.theme.mode}
      options={chartState.options}
      series={chartState.series}
      height={190}
      width={'100%'}
      type="area"
    />
  );
}

export default ChartsApex;
