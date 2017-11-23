const shell = require('shelljs');

const testScript = 'katulong rodoabad test';

const reporters = [
    '--reporter=html',
    '--reporter=text'
].join(' ');

const handler = () => {

    shell.exec(`npx nyc  ${reporters} ${testScript}`, code => shell.exit(code));

};

module.exports = {
    builder: {},
    command: 'coverage',
    describe: 'run coverage against tests',
    handler
};
