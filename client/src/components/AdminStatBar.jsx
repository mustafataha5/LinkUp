import * as React from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './AdminStatBar.css'; // Import custom CSS

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export default function AdminStatBar() {
  return (
    <div className="container mt-4 ml-6">
      <h2 className="" style={{}}>Jan - Jul Membership</h2>
      <div className="position-relative">
        <ChartContainer
          width={500}
          height={300}
          series={[{ data: uData, label: 'Subscriptions', type: 'bar' }]}
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



// import * as React from 'react';
// import { ChartContainer } from '@mui/x-charts/ChartContainer';
// import { BarPlot } from '@mui/x-charts/BarChart';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import './AdminStatBar.css';


// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const xLabels = [ 
//   'January', 'February', 'March', 'April', 'May', 'June', 'July'  ];

// export default function AdminStatBar() {
//   return (
//     <div>
//       <h2 style={{ textAlign: 'left', marginTop: '5px', marginLeft: '55px'}}>January to July Subscription </h2>
//       <ChartContainer
//         width={500}
//         height={300}
//         series={[{ data: uData, label: 'Subscriptions', type: 'bar' }]}
//         xAxis={[{
//           scaleType: 'band',
//           data: xLabels
//         }]}
//         yAxis={[{ label: 'Number of Subscriptions' }]}
//       >
//         <BarPlot />
//       </ChartContainer>
//       <div style={{ textAlign: 'left', marginTop: '5px', marginLeft: '220px'}}>
//         <span><h2>Month</h2></span>
//       </div>
//     </div>
//   );
// }





// import * as React from 'react';
// import { ChartContainer } from '@mui/x-charts/ChartContainer';
// import { BarPlot } from '@mui/x-charts/BarChart';

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const xLabels = [
//   'January', 'February', 'March', 'April', 'May', 'June', 'July', ];

// export default function AdminStatBar() {
//   return (
//     <ChartContainer
//       width={500}
//       height={300}
//       title="Subscription Data from January to July"
//       series={[{ data: uData, label: 'Subscriptions', type: 'bar' }]}
//       xAxis={[{
//         scaleType: 'band',
//         data: xLabels,
//         label: 'Month'
//       }]}
//       yAxis={[{  label: 'Number of Subscriptions'   }]}
//     >
//       <BarPlot />
//     </ChartContainer>
//   );
// }


// import * as React from 'react';
// import { ChartContainer } from '@mui/x-charts/ChartContainer';
// import { BarPlot } from '@mui/x-charts/BarChart';

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const xLabels = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',    ];

// export default function AdminStatBar() {
//   return (
//     <ChartContainer
//       width={500}
//       height={300}
//       title="Bar Chart of Page Views"
//       series={[{ data: uData, label: 'uv', type: 'bar' }]}
//       xAxis={[{
//         scaleType: 'band',
//         data: xLabels,
//         label: 'Pages' // X-axis annotation
//       }]}
//       yAxis={[{
//         label: 'Number of Views'
//       }]}
//     >
//       <BarPlot />
//     </ChartContainer>
//   );
// }
