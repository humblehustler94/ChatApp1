// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // This plugin MUST be the last plugin in the array.
    plugins: ['react-native-reanimated/plugin'],
  };
};