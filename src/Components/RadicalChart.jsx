import React from 'react';
import ReactApexChart from 'react-apexcharts';

const MedicalRadialChart = () => {
  const data = {
    series: [80, 120, 130, 98], // Sample values for medical parameters
    options: {
      chart: {
        height: 390,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            }
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            margin: 8,
            fontSize: '16px',
            formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
          },
        }
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'], // Colors for different parameters
      labels: ['Heart Rate', 'Blood Pressure', 'Glucose Level', 'Oxygen Saturation'], // Medical parameter labels
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
              show: false
          }
        }
      }]
    }
  };

  return (
      <div id="chart" className='w-1/3 bg-white rounded-3xl h-fit'>
        <ReactApexChart options={data.options} series={data.series} type="radialBar" height={350}/>
      </div>
  );
};

export default MedicalRadialChart;
