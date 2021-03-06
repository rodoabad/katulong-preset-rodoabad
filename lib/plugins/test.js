const path = require('path');
const shell = require('shelljs');

const directoriesToCheck = [
    'test/unit'
].join(' ');

const handler = () => {

    const binPath = path.resolve(__dirname, '../../', './node_modules/.bin');

    const babelRegister = path.resolve(__dirname, '../config', 'babel-register.js');

    shell.exec(`"${binPath}/mocha" ${directoriesToCheck} -r ${babelRegister}`, code => shell.exit(code));

};

module.exports = {
    builder: {},
    command: 'test',
    describe: 'run tests',
    handler
};
