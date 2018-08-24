import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './Home';
import './App.css';

const App = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <Home {...routerProps} {...props} />}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
