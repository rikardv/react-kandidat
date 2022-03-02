import React, { useEffect, useState } from 'react';
import getTestData from './connections/getTestData.js';

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
