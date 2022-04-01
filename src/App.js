import React, { useEffect, useState } from 'react';
import BarChartKursBetyg from './components/charts/BarChartKursBetyg.js';
import Histogram from './components/charts/Histogram.js';
import theme from './style/themeProvider';
import SandBoxContainer from './components/containers/SandBoxContainer.js';
import { ThemeProvider } from '@mui/material';
import HeaderContainer from './components/containers/HeaderContainer.js';

const App = () => {
  /**
   * Variable for setting what component to view
   * Tillfällen till klarad tenta as default
   */
  const [selectedView, setSelectedView] = useState(null);

  //Function that takes in user selection and return component accordingly
  const componentToRender = (selectedView) => {
    switch (selectedView) {
      case 1:
        return <SandBoxContainer />;

      case 2:
        return <BarChartKursBetyg />;

      case 3:
        return <Histogram />;
      default:
        return <div>No selection..</div>;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      {componentToRender(selectedView)}
    </ThemeProvider>
  );
};

export default App;
