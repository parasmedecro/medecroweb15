import React from 'react';
import Chart from 'react-apexcharts';

function ClinicalEarnings() {

  const earnings = [32000, 36000, 32300, 32000, 33000, 35000, 34500, 33000, 31000];

  const options = {
    colors: ['#3B82F6'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep'
      ],
      title: {
        text: 'Months',
      }
    },
    yaxis: {
      min: 28000,
      max: 40000,
      tickAmount: 6,
      title: {
        text: 'Earnings (INR)',
      }
    },
    markers: {
      size: 5,
      hover: {
        size: 9
      }
    }
  };

  const series = [
    {
      name: 'Clinical Earnings',
      data: earnings
    }
  ];

  return (
    <div className="px-3 pt-4 bg-white text-dark rounded-xl w-fit h-fit mt-10">
      <h2>Clinical Earnings 2024</h2>
      <Chart options={options} series={series} type="area" width="750" height="350"/>
    </div>
  );
}

export default ClinicalEarnings;