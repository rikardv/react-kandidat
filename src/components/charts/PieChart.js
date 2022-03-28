import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#11636C", "#769BA1", "#654F6F", "#C0A0CF", "#D7B6AC"];

const PieChartComponent = (data) => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setNewData(data.data);
  }, [data]);
  return (
    <div>
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
            legendType="rect"
          >
            {newData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
