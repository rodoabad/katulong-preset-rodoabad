const path = require('path');

const babelPlugins = require('./babel-plugins');
const babelPresets = require('./babel-presets');

const distPath = path.resolve('.', 'dist');

const pkg = require(path.resolve('./package.json'));

const moduleConfig = {
    rules: [
        {
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
            test: /\.scss/,
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
                },
                {
                    loader: require.resolve('sass-loader')
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
