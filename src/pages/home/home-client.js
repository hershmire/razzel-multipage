import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';

const initialState = JSON.parse(document.getElementById('props').text);

hydrate(
  <BrowserRouter>
    <App {...initialState} />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
