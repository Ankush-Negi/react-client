import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { TraineeComponent } from './pages';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <>
      <TraineeComponent />
    </>
  </MuiThemeProvider>
);

export default App;
