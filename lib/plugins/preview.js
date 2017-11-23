const path = require('path');
const shell = require('shelljs');

const handler = () => {

    const config = path.resolve(__dirname, '../../lib/config/webpack.preview.js');

    shell.rm('-rf', path.resolve('./dist'));
    shell.exec(`npx webpack-dev-server --config ${config}`, code => shell.exit(code));

};

module.exports = {
    builder: {},
    command: 'preview',
    describe: 'preview your package',
    handler
};
