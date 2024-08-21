import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function AdminStat() {
  return (
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
    />
  );
}