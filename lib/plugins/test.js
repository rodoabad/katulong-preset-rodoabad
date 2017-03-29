const path = require('path');
const shell = require('shelljs');

const directoriesToCheck = [
    'test/unit'
].join(' ');

const handler = () => {

    const binPath = path.resolve('./node_modules/.bin');

    shell.exec(`"${binPath}/mocha" ${directoriesToCheck}`, code => shell.exit(code));

};

module.exports = {
    builder: {},
    command: 'test',
    describe: 'run tests',
    handler
};
