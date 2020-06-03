
import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import {
  TextFieldDemo, ChildrenDemo, TraineeComponent, LoginPage, InputDemo, NoMatch,
} from './pages';
import { AuthLayoutRoute, PrivateLayoutRoute } from './routes/index';
import { SnackBarProvider } from './contexts';


function App() {
  return (
    <SnackBarProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/trainee" />
          </Route>
          <AuthLayoutRoute exact path="/login" component={LoginPage} />
          <PrivateLayoutRoute exact path="/trainee" component={TraineeComponent} />
          <PrivateLayoutRoute exact path="/TextFieldDemo" component={TextFieldDemo} />
          <PrivateLayoutRoute exact path="/ChildrenDemo" component={ChildrenDemo} />
          <PrivateLayoutRoute exact path="/InputDemo" component={InputDemo} />
          <PrivateLayoutRoute component={NoMatch} />
        </Switch>
      </Router>
    </SnackBarProvider>

  );
}

export default App;
