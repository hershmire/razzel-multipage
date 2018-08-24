import express from 'express';
import aboutRoute from './pages/about/about-server';
import homeRoute from './pages/home/home-server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import getBody from './util/page-template';

const app = express();
app
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))

aboutRoute(app);
homeRoute(app);

/**
 * Catch all route which will attempt to render the page
 * if it contains the appropriate state.
 */
app.get('*', (req, res) => {
  // console.log('XXX res.locals:', res.locals);
  if (!res.locals.state) {
    console.log('ERROR: Missing "res.locals.state"');
    return res.status(500).send('Oops, something went wrong. Please try again.');
  }

  const { Component, assetId, title, props } = res.locals.state;
  const context = {};
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <Component {...props} />
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    const body = getBody({ title, assetId, props }, markup);
    res.status(200).send(body);
  }
});

export default app;
