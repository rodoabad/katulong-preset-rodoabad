const path = require('path');
const shell = require('shelljs');

const handler = () => {

    const binPath = path.resolve(__dirname, '../../', './node_modules/.bin');
    const config = path.resolve(__dirname, '../../lib/config/webpack.preview.js');

    shell.rm('-rf', path.resolve('./dist'));
    shell.exec(`"${binPath}/webpack" --config ${config}`, code => shell.exit(code));

};

module.exports = {
    builder: {},
    command: 'build',
    describe: 'build your package',
    handler
};
