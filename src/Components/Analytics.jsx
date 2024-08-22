import React from 'react'
import Chart from 'react-apexcharts'

function Analytics() {
  const options = {
    colors: ['#a105f5'],
    chart: {
      height: 280,
      type: 'area'
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight'
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    markers: {
      size: 5,
      hover: {
        size: 9
      }
    }
  }

  const series = [
    {
      name: 'Calorie Burnt',
      data: [400, 350, 480, 220, 240, 400, 140]
    }
  ]

  return (
    <div className="px-5 py-7 bg-white text-dark rounded-xl w-full h-full">
      <h2>Analytics</h2>
      <Chart options={options} series={series} type="area"/>
    </div>
  )
}

export default Analytics
