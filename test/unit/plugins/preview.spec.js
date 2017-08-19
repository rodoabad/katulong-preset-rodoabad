const {
    expect
} = require('code');
const Chance = require('chance');
const previewTask = require('../../../lib/plugins/preview');
const path = require('path');
const shell = require('shelljs');
const sinon = require('sinon');

describe('Given the preview task', () => {

    let chance,
        pathStub,
        sandbox,
        shellExecStub,
        shellExitStub,
        shellRemoveStub;

    before(() => {

        sandbox = sinon.sandbox.create();

    });

    beforeEach(() => {

        chance = new Chance();

        pathStub = sandbox.stub(path, 'resolve');
        shellExecStub = sandbox.stub(shell, 'exec');
        shellExitStub = sandbox.stub(shell, 'exit');
        shellRemoveStub = sandbox.stub(shell, 'rm');

    });

    afterEach(() => {

        sandbox.restore();

    });

    it('should have the right command name', () => {

        const expectedCommand = 'preview';

        expect(previewTask.command).equal(expectedCommand);

    });

    it('should delete the dist folder', () => {

        const mockPath = chance.string();
        const expectedDirectoryToDelete = `${mockPath}/dist`;
        const expectedCommandArguments = '-rf';

        pathStub.withArgs('./dist').returns(expectedDirectoryToDelete);

        previewTask.handler();

        sinon.assert.calledOnce(shellRemoveStub);
        sinon.assert.calledWithMatch(shellRemoveStub, expectedCommandArguments, expectedDirectoryToDelete);

    });

    it('should execute webpack with the correct binary path and comment', () => {

        const mockPath = chance.string();

        const expectedCommandToExecute = `"${mockPath}/webpack-dev-server"`;

        pathStub.returns(mockPath);

        previewTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedCommandToExecute);

    });

    it('should be using the webpack config from this package', () => {

        const expectedConfigurationArgument = '--config';

        previewTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedConfigurationArgument);

    });

    it('should exit with the right code', () => {

        const expectedExitCode = chance.natural();

        shellExecStub.callsFake((commandToExecute, callbackFunction) => {

            callbackFunction(expectedExitCode);

        });

        previewTask.handler();

        sinon.assert.calledOnce(shellExitStub);
        sinon.assert.calledWithExactly(shellExitStub, expectedExitCode);

    });

});
