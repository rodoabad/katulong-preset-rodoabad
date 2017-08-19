const path = require('path');

const babelPlugins = require('./babel-plugins');
const babelPresets = require('./babel-presets');

const entryPath = path.resolve('.', 'src/index.js');
const distPath = path.resolve('.', 'dist');

const moduleConfig = {
    rules: [
        {
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: require.resolve('babel-loader'),
                options: {
                    plugins: babelPlugins,
                    presets: babelPresets
                }
            }
        }
    ]
};

const config = {
    bail: true,
    entry: entryPath,
    module: moduleConfig,
    output: {
        filename: 'bundle.js',
        path: distPath
    }
};

module.exports = config;
