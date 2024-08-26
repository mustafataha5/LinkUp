import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function AdminStatPie({genderCounts}) {
  return (
    <div style={{ textAlign: 'center', backgroundColor:'white', padding:'20px' }}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: genderCounts.male, label: 'Male' },
              { id: 1, value: genderCounts.female, label: 'Female' },
            ],
          },
        ]}
        width={600}
        height={300}
        colors={['rgb(73 72 71)', 'rgb(255 165 0)']}  // Set the colors here
        style={{ margin: '0 auto' }} 
      />
    </div>
  );
}
