import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SleepTracker = () => {
  const generateRandomSleepData = (count) => {
    let normalSleepData = [];
    let deepSleepData = [];
    let baseTime = new Date('2024-04-29T00:00:00').getTime(); // Start from today

    for (let i = 0; i < count; i++) {
      let sleepStart = baseTime + Math.floor(Math.random() * 12) * 2; // Random sleep start time within a 12-hour window
      let sleepDuration = Math.floor(Math.random() * 8 + 4) // Random sleep duration between 4 to 12 hours
      let deepSleepDuration = Math.floor(Math.random() * sleepDuration * 0.5); // Random deep sleep duration up to 50% of total sleep duration
      let normalSleepDuration = sleepDuration - deepSleepDuration;

      normalSleepData.push({
        x: sleepStart,
        y: normalSleepDuration,
      });

      deepSleepData.push({
        x: sleepStart,
        y: deepSleepDuration,
      });

      baseTime += 86400000; // Move to the next day
    }

    return { normal: normalSleepData, deep: deepSleepData };
  };

  const sleepData = generateRandomSleepData(25); // Generate random sleep data for 30 days

  const seriesData = [
    {
      name: 'Normal Sleep',
      data: sleepData.normal,
    },
    {
      name: 'Deep Sleep',
      data: sleepData.deep,
    },
  ];

  const options = {
    chart: {
      height: 320,
      type: 'scatter',
      zoom: {
        type: 'xy',
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleDateString(); // Format x-axis labels as dates
        },
      },
    },
    yaxis: {
      title: {
        text: 'Sleep Duration (hours)',
      },
    },
    markers: {
      size: 8,
    },
    colors: ['#056BF6', '#D2376A'], // Define colors for normal sleep and deep sleep data points
  };

  return (
    <div id="chart" className='bg-white rounded-xl w-2/3 h-fit p-4'>
      <ReactApexChart options={options} series={seriesData} type="scatter" height={290} />
    </div>
  );
};

export default SleepTracker;
