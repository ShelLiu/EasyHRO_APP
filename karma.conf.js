// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-ajax', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/index.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/index.js': ['webpack']
    },


    // Webpack
    webpack: {
      devtool: 'eval',
      module: {
        loaders: [
          {
            test: /\.(le|c)ss$/,
            loaders: ['style', 'css', 'less']
          },
          {
            test: /\.jsx?$/,
            loaders: ['babel']
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
          },
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'
          }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts'
          }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
          }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts'
          }
        ]
      },
      output: {
        pathinfo: true
      }
    },


    // Webpack middleware
    webpackMiddleware: {
      noInfo: true
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
};
