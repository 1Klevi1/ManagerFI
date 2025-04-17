const webpack = require("webpack");

module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        path: require.resolve("path-browserify"),
        fs: false, // fs can't be polyfilled in browser
    };

    return config;
};