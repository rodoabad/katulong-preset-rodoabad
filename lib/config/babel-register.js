const plugins = require('./babel-plugins');
const presets = require('./babel-presets');

require('babel-register')({
    ignore: /node_modules\/(?!@at-scale)/,
    plugins,
    presets
});
