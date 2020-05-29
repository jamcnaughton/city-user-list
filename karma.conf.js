'use strict';
var webpackConfig = require('./webpack.config');
process.env.CHROME_BIN = require('puppeteer').executablePath();
module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine-ajax', 'jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-jasmine-ajax',
            'karma-chrome-launcher',
            'karma-webpack',
            'karma-mocha-reporter'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        customLaunchers: {
            HeadlessChrome: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--disable-translate',
                    '--disable-extensions'
                ]
            }
        },
        singleRun: true,
        autoWatchBatchDelay: 300,
        files: [
            './tests/**/*.js'
        ],
        preprocessors: {
            './tests/**/*.js': ['webpack'],
        },
        reporters: ['mocha'],
        webpack: webpackConfig
    });
};
