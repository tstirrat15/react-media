import React from "react";
import { render } from '@testing-library/react';
import ReactDOMServer from 'react-dom/server';

import { format } from "util";

/*
 * This is to help make sure that two-pass rendering
 * works properly, by causing the warning associated
 * with mismatched markup on hydration to cause tests
 * to fail, rather than just throwing a console warning.
*/
/* eslint-disable no-undef */
const error = global.console.error;

global.console.error = function(...args) {
  error(...args);
  throw new Error(format(...args));
};
/* eslint-enable */

let StrictMode = function(props) {
  return props.children || null;
};

if (React.StrictMode) {
  StrictMode = React.StrictMode;
}

export function renderStrict(element, renderOptions = {}) {
  return render(<StrictMode>{element}</StrictMode>, renderOptions);
}

export function serverRenderStrict(element) {
  return ReactDOMServer.renderToString(<StrictMode>{element}</StrictMode>);
}
