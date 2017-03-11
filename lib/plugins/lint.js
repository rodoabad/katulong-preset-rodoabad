const path = require('path');
const shell = require('shelljs');

const directoriesToCheck = [
    'bin',
    'lib',
    'src',
    'test'
].join(' ');

const builder = {
    directories: {
        default: directoriesToCheck
    }
};

const handler = argv => {

    const parseFiles = argv.directories.replace(/,/g, ' ');
    const binPath = path.resolve('./node_modules/.bin');

    shell.exec(`"${binPath}/eslint" ${parseFiles} --cache --ignore-pattern coverage demo dist node_modules`, code => shell.exit(code));

};

module.exports = {
    builder,
    command: 'eslint',
    describe: 'lint JS',
    handler
};
