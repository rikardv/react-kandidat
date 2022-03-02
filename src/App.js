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

  return <div>Hej</div>;
};

export default App;


const data = [{
  "name": "5a",
  "value": 400

},
{
  "name": "3a",
  "value": 300
},
{
  "name": "4a",
  "value": 300
},
{
  "name": "U",
  "value": 200
},
{
  "name": "U",
  "value": 2000
}
];

const renderPieChart= (
  <PieChart width={730} height={250}>
  <Pie data={data} dataKey="value" nameKey="3a" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
  
</PieChart>
);
