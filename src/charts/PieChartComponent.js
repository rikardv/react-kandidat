import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#202409'];

const PieChartComponent = (data) => {
  const [newData, setNewData] = useState([]);
  console.log(data);
  useEffect(() => {
    setNewData(data.data);
  }, [data]);
  return (
    <ResponsiveContainer width="100%" height={450}>
      <PieChart width={2000} height={2000}>
        <Pie
          data={newData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={200}
          fill="#8884d8"
          dataKey="antal"
          label
        >
          {newData.map((entry, index) => (
            <Cell
              onClick={() => console.log(entry)}
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
