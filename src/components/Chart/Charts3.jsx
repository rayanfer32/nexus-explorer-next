import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import jsonData from 'assets/data/coingecko.json';
import styles from './Charts3.module.css';

export default function Charts3() {
  const priceChartOptions = {
    // title: {
    //   text: 'Prices',
    // },
    // subtitle: {
    //   text: 'Overview of Nexus Historical Prices',
    // },
    chart: {
      type: 'line',
      //   borderRadius: '20px',
      className: styles.container,
    },
    series: [
      {
        name: '$',
        data: jsonData.prices,
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
    />
    // </div>
  );
}
