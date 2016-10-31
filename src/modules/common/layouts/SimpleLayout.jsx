/* eslint-disable react/no-danger */
// import type { ReactElement } from 'alp-react-redux/src/types';
import React from 'react';

// import { PropTypes } from 'react';
//
// const propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   body: PropTypes.string.isRequired,
//   preBody: PropTypes.element,
//   postBody: PropTypes.element,
// };

type PropsType = {
  title: ?string,
  description: ?string,
  body: string,
  // preBody: ReactElement,
  // postBody: ReactElement,
};

export default ({ title = '', description = '', body, preBody, postBody }: PropsType) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700,500,300,100,500italic,400italic,700italic" rel="stylesheet" type="text/css" />
      <link rel="stylesheet" href="/index.css" />
    </head>
    <body>
      {preBody}
      <div id="app" dangerouslySetInnerHTML={{ __html: body }} />
      {postBody}
    </body>
  </html>
);
