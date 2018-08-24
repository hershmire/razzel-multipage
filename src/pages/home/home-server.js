import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import getBody from '../../util/page-template';
import App from './App';

export default function pageRoute(app) {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    const props = { name: 'Eddie' };
    res.locals.state = {
      title: 'Home',
      assetId: 'home',
      Component: App,
      props
    };

    next();
  });

  app.use(router);
}
