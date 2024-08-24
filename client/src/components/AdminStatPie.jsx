import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function AdminStatPie({genderCounts}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{textAlign: 'center'}}>Gender Distribution</h2>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: genderCounts.male, label: 'Male' },
              { id: 1, value: genderCounts.female, label: 'Female' },
            ],
          },
        ]}
        width={400}
        height={200}
        colors={['yellow', 'violet']}  // Set the colors here
        style={{ margin: '0 auto' }} 
      />
    </div>
  );
}



// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';

// export default function AdminStatPie() {
//   return (
//     <div style={{ textAlign: 'center' }}>
//       {/* <h2>Gender Distribution</h2> */}
//       <PieChart
//         series={[
//           {
//             data: [
//               { id: 0, value: 55, label: 'Male' },
//               { id: 1, value: 45, label: 'Female' },
//             ],
//           },
//         ]}
//         width={400}
//         height={200}
//         style={{ margin: '0 auto' }} 
//       />
//     </div>
//   );
// }