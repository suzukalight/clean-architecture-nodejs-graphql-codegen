const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules')([
  // Not sure all of the following need to be included, just did to make sure
  '@adobe/react-spectrum',
  '@adobe/react-spectrum-ui',
  '@react-aria',
  '@react-spectrum',
  '@react-stately',
]);

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = (file) => {};
}
global.requestAnimationFrame = (cb) => cb();

module.exports = withPlugins([withCSS, withTM], {
  // Your next configuration
});
