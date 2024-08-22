import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const StressDataChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      series: [{
        name: 'Stress Level',
        data: [20, 25, 22, 18, 16, 19, 23, 27, 30, 28, 25, 22, 20, 18, 15, 17, 19, 22]
      }],
      chart: {
        height: 280,
        type: 'line',
      },
      forecastDataPoints: {
        count: 7
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000',
          '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000',
          '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001',
          '4/11/2001', '5/11/2001', '6/11/2001'
        ],
        tickAmount: 10,
        labels: {
          formatter: function(value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM');
          }
        }
      },
      title: {
        text: 'Stress Level Forecast',
        align: 'left',
        style: {
          fontSize: "16px",
          color: '#666'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#FF7F0E'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      }
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div id="chart" ref={chartRef} className='bg-white rounded-xl p-3 w-2/3'></div>
  );
};

export default StressDataChart;
