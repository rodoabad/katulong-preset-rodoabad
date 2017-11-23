const path = require('path');
const shell = require('shelljs');

const directoriesToCheck = [
    'test/unit'
].join(' ');

const handler = () => {

    const babelRegister = path.resolve(__dirname, '../config', 'babel-register.js');

    shell.exec(`npx mocha ${directoriesToCheck} -r ${babelRegister}`, code => shell.exit(code));

};

module.exports = {
    builder: {},
    command: 'test',
    describe: 'run tests',
    handler
};
