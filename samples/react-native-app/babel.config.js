module.exports = function(api) {
  api.cache.never()
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // This is the local reference @fullstory/babel-plugin-annotate-react
      // To use in your projects you would replace '../..' with '@fullstory/babel-plugin-annotate-react'
      ['../..', { native: true, }]
    ],
  };
};
