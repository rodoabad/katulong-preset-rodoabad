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

const handler = () => {

    shell.exec(`npx eslint ${directoriesToCheck} --cache --ignore-pattern ${direcToriesToIgnore}`, code => shell.exit(code));

};

module.exports = {
    builder: {},
    command: 'lint',
    describe: 'lint JS',
    handler
};
