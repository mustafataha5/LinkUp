import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function AdminStatPie() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Gender Distribution</h2>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 55, label: 'Male' },
              { id: 1, value: 45, label: 'Female' },
            ],
          },
        ]}
        width={400}
        height={200}
        style={{ margin: '0 auto' }} 
      />
    </div>
  );
}