import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import getBody from '../../util/page-template';
import App from './App';

export default function pageRoute(app) {
  const router = express.Router();

  router.get('/about', (req, res, next) => {
    const props = {
      test: true,
      isReactProps: true,
      name: 'Eddie',
      poop: true,
    };

    res.locals.state = {
      title: 'About',
      assetId: 'about',
      Component: App,
      props
    };

    next();
    // const context = {};
    // const markup = renderToString(
    //   <StaticRouter context={context} location={req.url}>
    //     <App />
    //   </StaticRouter>
    // );

    // if (context.url) {
    //   res.redirect(context.url);
    // } else {
    //   const body = getBody({
    //     name: 'about',
    //     state: {
    //       title: 'About'
    //     }
    //   }, markup);
    //   res.status(200).send(body);
    // }
  });

  app.use(router);
}
