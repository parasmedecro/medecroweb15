import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StrokedGauge = () => {
  const series = [65];

  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
      offsetY: -10
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 120
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            color: undefined,
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
      },
    },
    stroke: {
      dashArray: 4
    },
    labels: ['Body Water Level'],
  };

  return (
      <div id="chart" className='bg-white rounded-3xl w-1/3 h-fit'>
        <ReactApexChart options={options} series={series} type="radialBar" height={370}/>
      </div>
  );
};

export default StrokedGauge;
