const {
    expect
} = require('code');
const Chance = require('chance');
const lintTask = require('../../../lib/plugins/lint');
const shell = require('shelljs');
const sinon = require('sinon');

describe('Given the lint task', () => {

    let chance,
        sandbox,
        shellExecStub,
        shellExitStub;

    before(() => {

        sandbox = sinon.sandbox.create();

    });

    beforeEach(() => {

        chance = new Chance();

        shellExecStub = sandbox.stub(shell, 'exec');
        shellExitStub = sandbox.stub(shell, 'exit');

    });

    afterEach(() => {

        sandbox.restore();

    });

    it('should have the right command name', () => {

        const expectedCommand = 'lint';

        expect(lintTask.command).equal(expectedCommand);

    });

    it('should execute eslint with the correct binary path and comment', () => {

        const expectedCommandToExecute = 'npx eslint';

        lintTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedCommandToExecute);

    });

    it('should parse the directories passed correctly', () => {

        const expectedDefaultDirectories = 'bin lib src test';

        lintTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedDefaultDirectories);

    });

    it('should be caching eslint', () => {

        const expectedCachingConfiguration = '--cache';

        lintTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedCachingConfiguration);

    });

    it('should ignore the following directories', () => {

        const mockDirectoriesToIgnore = [
            'coverage',
            'demo',
            'dist',
            'node_modules'
        ].join(' ');

        const expectedPatternToIgnore = `--ignore-pattern ${mockDirectoriesToIgnore}`;

        lintTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedPatternToIgnore);

    });

    it('should exit with the right code', () => {

        const expectedExitCode = chance.natural();

        shellExecStub.callsFake((commandToExecute, callbackFunction) => {

            callbackFunction(expectedExitCode);

        });

        lintTask.handler();

        sinon.assert.calledOnce(shellExitStub);
        sinon.assert.calledWithExactly(shellExitStub, expectedExitCode);

    });

});
