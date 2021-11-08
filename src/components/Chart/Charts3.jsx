import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styles from './Charts3.module.css';

// https://www.highcharts.com/docs/chart-design-and-style/style-by-css
export default function Charts3({ chartData }) {
  const priceChartOptions = {
    // title: {
    //   text: 'Prices',
    // },
    // subtitle: {
    //   text: 'Overview of Nexus Historical Prices',
    // },
    credits: {
      enabled: false,
    },
    chart: {
      type: 'line',
      //   borderRadius: '20px',
      // className: styles.container,
      style: {
        fontFamily: 'Lato',
        background: 'var(--theme-page-background)',
        boxShadow: '0px 4px 4px #0007',
        borderRadius: '4px',
      },
    },
    series: [
      {
        name: '$',
        data: chartData.prices,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    rangeSelector: {
      floating: true,
      y: 0,
      verticalAlign: 'top',
    },
    navigator: {
      // margin: 60
      enabled: false,
    },
  };

  // const totalVolumeChartOptions = {
  //     title: {
  //         text: 'Total Volume'
  //     },
  //     subtitle: {
  //         text: 'Overview of Nexus Historical Volumes'
  //     },
  //     series: [{
  //         name: '$',
  //         data: jsonData.total_volumes,
  //         tooltip: {
  //             valueDecimals: 2
  //         }
  //     }],
  //     rangeSelector: {
  //         floating: true,
  //         y: 0,
  //         verticalAlign: 'top'
  //     },
  //     navigator: {
  //         enabled: false
  //     },
  // }

  return (
    // <div className={styles.container}>
    //   <div className={styles.prices}>Prices</div>
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={priceChartOptions}
      size={200}
      className={styles.container}
    />
    // </div>
  );
}
