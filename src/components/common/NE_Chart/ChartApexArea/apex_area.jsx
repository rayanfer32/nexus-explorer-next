import { useEffect, useState } from 'react';
// import contracts24h from 'assets/data/contracts24h';
import styles from '../ChartsApex.module.scss';
// https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic';
import { useDarkMode } from 'hooks';
import { useAppContext } from 'contexts/AppContext';
import Shimmer from 'components/common/NE_Shimmer';
import useWindowSize from 'hooks/useWindowSize/useWindowSize';
import { useQuery } from 'react-query';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import TYPES from 'types';
import { NETWORKS } from 'types/ConstantsTypes';
import { initialEssentials } from './essentials';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function AreaChart({ initialData }) {
  const { sharedState } = useAppContext();
  const [isDarkMode] = useDarkMode();
  const windowSize = useWindowSize();

  // * fetch the blocks first and extract the total number of contracts inside the trasactions
  const [limit, setLimit] = useState(2 * 60);
  const { network, getRecentBlocks } = useNetwork();
  const { isLoading, data } = useQuery(
    ['charting', limit, network.name],
    () => getRecentBlocks(limit),
    {
      initialData:
        limit <= 120 && network.name == NETWORKS.MAINNET.name
          ? initialData
          : undefined,
    }
  );

  let [chartState, setChartState] = useState(
    initialEssentials({
      options: {
        chart: {
          id: 'tx_chart',
          background: 'rgba(0, 0, 0, 0)',
          // TODO: work arround for apexcharts toolbar issue
          toolbar: {
            show: windowSize.width > 1000,
            offsetX: -48,
            offsetY: 8,
            tools: {
              download: false,
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
                  click: () => {
                    setLimit(2 * 60);
                  },
                },
                {
                  icon: '6H',
                  index: 3,
                  title: '6H',
                  class: 'custom-icon',
                  click: () => {
                    setLimit(6 * 60);
                  },
                },
                {
                  icon: '12H',
                  index: 4,
                  title: '12H',
                  class: 'custom-icon',
                  click: () => {
                    setLimit(12 * 60);
                  },
                },
                {
                  icon: '1D',
                  index: 5,
                  title: '24H',
                  class: 'custom-icon',
                  click: () => {
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
        colors: isDarkMode
          ? [TYPES.COLORS.SKY_BLUE]
          : [TYPES.COLORS.NEXUS_BLUE],
      },
    })
  );

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
      (prev.options.chart.toolbar.show = windowSize.width > 512),
        (prev.options.theme.mode = sharedState.theme);
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
  }, [sharedState.theme, windowSize]);

  if (isLoading) return <Shimmer width="100%" height="12.6rem" />;

  // Bug tribute: chart not updating when updating state (fixed with adding random key)
  // https://github.com/reactchartjs/react-chartjs-2/issues/90
  return (
    <Chart
      className={styles.chart__line}
      key={chartState.options.theme.mode}
      options={chartState.options}
      series={chartState.series}
      height={193}
      width={'100%'}
      type="area"
    />
  );
}

export default AreaChart;
