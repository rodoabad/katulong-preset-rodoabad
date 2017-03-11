const {
    expect
} = require('code');
const Chance = require('chance');
const lintTask = require('../../../lib/plugins/lint');
const path = require('path');
const shell = require('shelljs');
const sinon = require('sinon');

describe('Given the lint task', () => {

    let chance,
        pathStub,
        sandbox,
        shellExecStub;

    before(() => {

        sandbox = sinon.sandbox.create();

    });

    beforeEach(() => {

        chance = new Chance();

        pathStub = sandbox.stub(path, 'resolve');
        shellExecStub = sandbox.stub(shell, 'exec');

    });

    afterEach(() => {

        sandbox.restore();

    });

    it('should have the right command name', () => {

        const expectedCommand = 'lint';

        expect(lintTask.command).equal(expectedCommand);

    });

    it('should have a default set of directories to check', () => {

        const expectedDefaultDirectories = 'bin lib src test';

        expect(lintTask.builder.directories.default).equal(expectedDefaultDirectories);

    });

    it('should execute eslint with the correct binary path and comment', () => {

        const mockArgv = {
            directories: chance.string()
        };

        const mockPath = chance.string();

        const expectedCommandToExecute = `"${mockPath}/eslint"`;

        pathStub.returns(mockPath);
        lintTask.handler(mockArgv);

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedCommandToExecute);

    });

    it('should parse the directories passed correctly', () => {

        const directory1 = chance.string();
        const directory2 = chance.string();

        const expectedDirectories = `${directory1} ${directory2}`;

        const mockArgv = {
            directories: `${directory1},${directory2}`
        };

        lintTask.handler(mockArgv);

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedDirectories);

    });

    it('should be caching eslint', () => {

        const mockArgv = {
            directories: chance.string()
        };

        const expectedCachingConfiguration = '--cache';

        lintTask.handler(mockArgv);

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedCachingConfiguration);

    });

    it('should ignore the following directories', () => {

        const mockArgv = {
            directories: chance.string()
        };

        const mockDirectoriesToIgnore = [
            'coverage',
            'demo',
            'dist',
            'node_modules'
        ].join(' ');

        const expectedPatternToIgnore = `--ignore-pattern ${mockDirectoriesToIgnore}`;

        lintTask.handler(mockArgv);

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedPatternToIgnore);

    });

});
