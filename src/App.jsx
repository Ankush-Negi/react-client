import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { ChildrenDemo } from './pages';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <>
      <ChildrenDemo />
    </>
  </MuiThemeProvider>
);

export default App;
