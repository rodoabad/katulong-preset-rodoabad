const path = require('path');
const shell = require('shelljs');

const directoriesToCheck = [
    'bin',
    'lib',
    'src',
    'test'
].join(' ');

const direcToriesToIgnore = [
    'coverage',
    'demo',
    'dist',
    'node_modules'
].join(' ');

const builder = {
    directories: {
        default: directoriesToCheck
    }
};

const handler = argv => {

    const parseFiles = argv.directories.replace(/,/g, ' ');
    const binPath = path.resolve(__dirname, '../../node_modules/.bin');

    shell.exec(`"${binPath}/eslint" ${parseFiles} --cache --ignore-pattern ${direcToriesToIgnore}`, code => shell.exit(code));

};

module.exports = {
    builder,
    command: 'lint',
    describe: 'lint JS',
    handler
};
