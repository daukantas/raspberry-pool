'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { PropTypes } from 'react';
//
// const propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   body: PropTypes.string.isRequired,
//   preBody: PropTypes.element,
//   postBody: PropTypes.element,
// };

exports.default = (_ref) => {
  var _ref$title = _ref.title;
  let title = _ref$title === undefined ? '' : _ref$title;
  var _ref$description = _ref.description;
  let description = _ref$description === undefined ? '' : _ref$description;
  let body = _ref.body;
  let preBody = _ref.preBody;
  let postBody = _ref.postBody;
  return _react2.default.createElement(
    'html',
    { lang: 'en' },
    _react2.default.createElement(
      'head',
      null,
      _react2.default.createElement('meta', { charSet: 'utf-8' }),
      _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
      _react2.default.createElement(
        'title',
        null,
        title
      ),
      _react2.default.createElement('meta', { name: 'description', content: description }),
      _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      _react2.default.createElement('link', { href: 'https://fonts.googleapis.com/css?family=Roboto:400,700,500,300,100,500italic,400italic,700italic', rel: 'stylesheet', type: 'text/css' }),
      _react2.default.createElement('link', { rel: 'stylesheet', href: '/index.css' })
    ),
    _react2.default.createElement(
      'body',
      null,
      preBody,
      _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: body } }),
      postBody
    )
  );
}; /* eslint-disable react/no-danger */
// import type { ReactElement } from 'alp-react-redux/src/types';
//# sourceMappingURL=SimpleLayout.js.map