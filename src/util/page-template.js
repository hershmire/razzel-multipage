const path = require('path');
const fs = require('fs');
const template = require('lodash.template');
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const templatePath = path.join(process.cwd(), 'src/util/page-template.html');
const compiled = template(fs.readFileSync(templatePath));

export default function(ctx, body) {
  const { assetId, props } = ctx;
  const appName = 'Your app name';
  let title;

  if (!assets[assetId]) {
    throw new Error(`There is no asset by the id of "${assetId}"`);
  }

  if (!body) {
    throw new Error('"body" argument can not be undefined');
  }

  if (ctx.title) {
    title = `${ctx.title} - ${appName}`;
  } else {
    title = appName;
  }

  let pageStyles;
  if (assets[assetId].css) {
    pageStyles = `<link rel="stylesheet" href="${assets[assetId].css}">`;
  }

  let pageScripts;
  if (assets[assetId].js) {
    pageScripts = process.env.NODE_ENV === 'production'
      ? `<script src="${assets[`runtime~${assetId}`].js}" defer></script>
  <script src="${assets.common.js}" defer></script>
  <script src="${assets[assetId].js}" defer></script>`
      : `<script src="${assets[assetId].js}" defer crossorigin></script>`;
  }

  const templateObj = {
    body,
    title,
    pageStyles,
    pageScripts,
    props: JSON.stringify(props)
  };

  return compiled(templateObj);
};
