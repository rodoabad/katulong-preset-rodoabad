const path = require('path');
const shell = require('shelljs');

const directoriesToCheck = [
    'test/unit'
].join(' ');

const builder = {
    directories: {
        default: directoriesToCheck
    }
};

const handler = argv => {

    const parseFiles = argv.directories.replace(/,/g, ' ');
    const binPath = path.resolve(__dirname, '../../node_modules/.bin');

    console.log(binPath); // eslint-disable-line no-console

    shell.exec(`"${binPath}/mocha" ${parseFiles}`, code => shell.exit(code));

};

module.exports = {
    builder,
    command: 'test',
    describe: 'run tests',
    handler
};
