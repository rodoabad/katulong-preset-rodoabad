const path = require('path');

const babelPlugins = require('./babel-plugins');
const babelPresets = require('./babel-presets');

const distPath = path.resolve('.', 'dist');

const pkg = require(path.resolve('./package.json'));

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
        },
        {
            exclude: /node_modules/,
            test: /\.css$/,
            use: [
                {
                    loader: require.resolve('style-loader')
                },
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        localIdentName: '[name]__[local]___[hash:base64:5]',
                        modules: true
                    }
                }
            ]
        }
    ]
};

const config = {
    bail: true,
    module: moduleConfig,
    output: {
        filename: `${pkg.name}.js`,
        path: distPath
    }
};

module.exports = config;
