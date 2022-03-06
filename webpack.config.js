const {
  SvgGeneratorWebpackPlugin,
} = require('@ngneat/svg-generator/webpack-plugin');

module.exports =  {
    plugins: [
      new SvgGeneratorWebpackPlugin({
        watch: false,
        srcPath: './apps/platform/src/assets/svg',
        outputPath: './libs/svg',
        svgoConfig: {
          plugins: ['removeDimensions', 'cleanupAttrs'],
        },
      }),
  ]
};
