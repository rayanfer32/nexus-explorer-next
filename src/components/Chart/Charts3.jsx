import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import jsonData from 'assets/data/coingecko.json';

export default function Charts3() {
  const priceChartOptions = {
    // title: {
    //   text: 'Prices',
    // },
    // subtitle: {
    //   text: 'Overview of Nexus Historical Prices',
    // },
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
    <div className="container">
      <div className="prices">Prices</div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={priceChartOptions}
      />
      <style jsx>
        {`
          .prices {
            font-size: 0.7rem;
            font-weight: 600;
          }

          .container {
            display: flex;
            flex-direction: column;
            padding: 0.5rem;
            background: var(--theme-page-background);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
}
