import React, { useEffect, useState } from 'react';
import { PieChart,Pie,ResponsiveContainer, } from 'recharts';



const PieChartComponent = data => {
    const [newData, setNewData] = useState([])
    console.log(data)
    useEffect(() => {
      setNewData(data.data)
    }, [data])
    return (
        <ResponsiveContainer width="100%" height={450}> 
        <PieChart width={730} height={250}>
        
        <Pie data={newData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
      </PieChart>
    </ResponsiveContainer>
    )
}

  export default PieChartComponent;