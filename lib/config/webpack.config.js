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
