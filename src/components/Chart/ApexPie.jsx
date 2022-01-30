import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDarkMode } from 'hooks';
import TYPES from 'types';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ApexPie(props) {
  // const { sharedState } = useAppContext();
  const [isDarkMode, setLocalDarkMode, setGlobalDarkMode] = useDarkMode();
  const [series, setSeries] = useState(props.series);
  const [options, setOptions] = useState(
    props.options || {
      chart: {
        background: 'rgba(0, 0, 0, 0)',
      },
      theme: {
        mode: isDarkMode ? TYPES.theme.dark : TYPES.theme.light,
      },
      labels: props.labels || [],
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
    setSeries(props.series);
    if (props.options) {
      setOptions(props.options);
    }
  }, [props]);

  // * updates the chart when dark mode changes
  function updateChart() {
    let newOptions = { ...options };
    newOptions.theme.mode = isDarkMode ? TYPES.theme.dark : TYPES.theme.light;
    setOptions(newOptions);
  }

  // * update chart on theme change
  useEffect(() => {
    updateChart()
  }, [isDarkMode]);

  return (
      <Chart
        key={Math.random()}
        options={options}
        series={series}
        type="donut"
        width={380}
      />
  );
}

export default ApexPie;
