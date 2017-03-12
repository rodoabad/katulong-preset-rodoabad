const path = require('path');
const shell = require('shelljs');

const testScript = 'katulong rodoabad test';

const reporters = [
    '--reporter=html',
    '--reporter=text'
].join(' ');

const handler = () => {

    const binPath = path.resolve('./node_modules/.bin');

    shell.exec(`"${binPath}/nyc"  ${reporters} ${testScript}`, code => shell.exit(code));

};

module.exports = {
    builder: {},
    command: 'coverage',
    describe: 'run coverage against tests',
    handler
};
