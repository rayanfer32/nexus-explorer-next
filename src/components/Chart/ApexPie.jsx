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
        width: 380,
        type: 'pie',
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
    // update colors property of the chart
    newOptions.colors = isDarkMode
      ? [TYPES.colors.skyBlue]
      : [TYPES.colors.nexusBlue];
    // update fill color of the chart
    newOptions.fill.gradient.gradientToColors = isDarkMode
      ? [TYPES.colors.skyBlue]
      : [TYPES.colors.nexusBlue];

    setOptions(newOptions);
  }

  // * update chart on theme change
  useEffect(() => {
    updateChart();
  }, [isDarkMode]);

  return (
    <div>
      <Chart
        key={Math.random()}
        options={options}
        series={series}
        type="pie"
        width={380}
      />
    </div>
  );
}

export default ApexPie;
