exports.command = 'rodoabad';
exports.desc = 'Commands config for rodoabad';
exports.builder = yargs =>
    yargs.commandDir('plugins', {
        extensions: ['js'],
        recurse: true
    });
