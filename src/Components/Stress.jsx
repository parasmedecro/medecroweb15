import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const StressDataChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      series: [{
        name: 'Stress Level',
        data: [30, 32, 34, 35, 40, 38, 41, 39, 45, 50, 48, 44, 42, 39, 37, 35, 36, 40, 45, 48, 46, 47, 50, 52, 55, 58, 60, 62, 61, 59, 57]
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
          '2023-08-01', '2023-08-02', '2023-08-03', '2023-08-04', '2023-08-05',
          '2023-08-06', '2023-08-07', '2023-08-08', '2023-08-09', '2023-08-10',
          '2023-08-11', '2023-08-12', '2023-08-13', '2023-08-14', '2023-08-15',
          '2023-08-16', '2023-08-17', '2023-08-18', '2023-08-19', '2023-08-20',
          '2023-08-21', '2023-08-22', '2023-08-23', '2023-08-24', '2023-08-25',
          '2023-08-26', '2023-08-27', '2023-08-28', '2023-08-29', '2023-08-30',
          '2023-08-31'
        ],
        tickAmount: 10,
        labels: {
          formatter: function(value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM');
          }
        }
      },
      title: {
        text: 'Stress Level Over the Month',
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
