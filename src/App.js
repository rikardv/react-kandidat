import React, { useEffect, useState } from 'react';
import getTestData from './connections/getTestData.js';
import PieChartComponent from './charts/PieChartComponent.js';
const App = () => {
  const [testData, setTestData] = useState();

 

  useEffect(() => {
    getTestData().then((res) => {
      setTestData(res.data);
      console.log(res.data);
    });
  }, []);
  
  


  return (<PieChartComponent data= {testData}></PieChartComponent>)
};



export default App;





  

