import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import About from './About';
import './App.css';

const App = (initialState) => (
  <Switch>
    <Route
      exact
      path="/about"
      render={(props) => <About {...props} {...initialState} />}
    />
  </Switch>
);

export default App;
