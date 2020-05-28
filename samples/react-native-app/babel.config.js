module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['module:fullstory-babel-plugin-annotate-react'],
  };
};
