const path = require('path');
const shell = require('shelljs');

const handler = () => {

    const binPath = path.resolve('./node_modules/.bin');

    shell.exec(`"${binPath}/nyc" npm test`, code => shell.exit(code));

};

module.exports = {
    builder: {},
    command: 'coverage',
    describe: 'run coverage against tests',
    handler
};
