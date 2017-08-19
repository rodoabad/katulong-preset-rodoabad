const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpackConfig = require('./webpack.config');

const distPath = path.resolve('.', 'dist');

const entryPath = path.resolve('.', 'demo/index.js');
const template = path.resolve('.', 'demo/index.html');

const webpackPreview = {
    devServer: {
        contentBase: distPath
    },
    devtool: 'source-map',
    entry: entryPath,
    plugins: [
        new HtmlWebpackPlugin({
            template
        })
    ]
};

const webpackPreviewConfig = Object.assign({}, webpackConfig, webpackPreview);

module.exports = webpackPreviewConfig;

