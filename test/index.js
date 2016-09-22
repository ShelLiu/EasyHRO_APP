/**
 * Test entrance
 */


'use strict';

import ReactTap from 'react-tap-event-plugin';


ReactTap();

const srcContext = require.context('../src/components', true, /\.jsx?$/);
srcContext.keys().filter((key) => {
  return !(/(Chart)\.jsx$/.test(key));
}).forEach(srcContext);

const componentContext = require.context('./components', true, /\.js$/);
componentContext.keys().forEach(componentContext);

const containerContext = require.context('./containers', true, /\.js$/);
containerContext.keys().forEach(containerContext);