import React from 'react';
import Chart from 'react-apexcharts';

const SmallBarChart = (props) => {
  const colors = ['#FF4560', '#008FFB', '#00E396', '#775DD0', '#FEB019', '#FF4560', '#008FFB', '#00E396'];

  const options = {
    series: [{
      name:props.name,
      data:props.data
    }],
    chart: {
      height: '100%',
      type: 'bar',
      toolbar: { show: false },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ['', '', '', '', '', '', '', ''],
    },
    yaxis: {
      show: false,
    },
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        dataLabels: {
          enabled: false,
        },
      },
    }
  };

  return (
    <div className='flex-grow h-0 w-fit p-0'>
      <Chart options={options} series={options.series} type="bar" height="100%" />
    </div>
  );
};

export default SmallBarChart;
