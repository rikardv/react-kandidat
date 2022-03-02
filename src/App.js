import React, { useEffect, useState } from 'react';
import getTestData from './connections/getTestData.js';
import { PieChart,Pie } from 'recharts';
const App = () => {
  const [testData, setTestData] = useState();

  useEffect(() => {
    getTestData().then((res) => {
      setTestData(res.data);
      console.log(res.data);
    });
  }, []);

  return (<PieChart width={730} height={250}>
    <Pie data={testData} dataKey="value" nameKey="" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
    
  </PieChart>);
};

export default App;





  

