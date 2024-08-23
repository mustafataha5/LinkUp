import * as React from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export default function AdminStatBar() {
  return (
    <div className="container mt-9 ml-6">
      {/* <h2 className="" style={{}}>Jan - Jul Membership</h2> */}
      <div className="position-relative">
        <ChartContainer
          width={510}
          height={300}
          series={[{
            data: uData,
            label: 'Subscriptions',
            type: 'bar',
            color: 'orange',  
          }]}
          xAxis={[{
            scaleType: 'band',
            data: xLabels,
            label: 'Month'
          }]}
          yAxis={[{ label: 'Number of Subscriptions' }]}
        >
          <BarPlot />
        </ChartContainer>
        {/* Overlay text labels on bars using CSS */}
        {xLabels.map((label, index) => (
          <div
            key={index}
            className="bar-label"
            style={{
              left: `${index * 70 + 10}px`, // Adjust based on your bar width and spacing
              bottom: '10px' // Adjust based on your chart height and desired position
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}