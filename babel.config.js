// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add the new dotenv plugin here, before reanimated
      'module:react-native-dotenv',
      // This plugin MUST be the last plugin in the array.
      'react-native-reanimated/plugin',
    ],
  };
};