import React, { useEffect, useState } from 'react';
import getTestData from './connections/getTestData.js';

const App = () => {
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    getTestData().then((res) => {
      setTestData(res.data[0]);
    });
  }, []);

  return <div>Hej {testData.PERSONNUMMER}</div>;
};

export default App;
