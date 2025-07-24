'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  { name: 'Sale', value: 400 },
  { name: 'Distribute', value: 100 },
  { name: 'Return', value: 100 },
  { name: 'Others', value: 100 }, // 画像にはないが、80%がTransactionsであることを示すために合計を500に調整
];

const COLORS = ['#5BC4FF', '#FFDF6B', '#FF7D6B', '#E0E0E0']; // Sale, Distribute, Return, Others（グレー）

const AnalyticsDoughnutChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          startAngle={90}
          endAngle={-270} // 時計回りに360度
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            value="80%"
            position="center"
            className="font-bold text-2xl"
            fill="#333"
            dy={-10}
          />
          <Label
            value="Transactions"
            position="center"
            className="text-sm"
            fill="#666"
            dy={10} // 'Transactions'を少し下に移動
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsDoughnutChart; 