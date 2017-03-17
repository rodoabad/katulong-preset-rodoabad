const {
    expect
} = require('code');
const Chance = require('chance');
const testTask = require('../../../lib/plugins/test');
const path = require('path');
const shell = require('shelljs');
const sinon = require('sinon');

describe('Given the test task', () => {

    let chance,
        pathStub,
        sandbox,
        shellExecStub,
        shellExitStub;

    before(() => {

        sandbox = sinon.sandbox.create();

    });

    beforeEach(() => {

        chance = new Chance();

        pathStub = sandbox.stub(path, 'resolve');
        shellExecStub = sandbox.stub(shell, 'exec');
        shellExitStub = sandbox.stub(shell, 'exit');

    });

    afterEach(() => {

        sandbox.restore();

    });

    it('should have the right command name', () => {

        const expectedCommand = 'test';

        expect(testTask.command).equal(expectedCommand);

    });

    it('should have a default set of directories to check', () => {

        const expectedDefaultDirectories = 'test/unit';

        expect(testTask.builder.directories.default).equal(expectedDefaultDirectories);

    });

    it('should execute mocha with the correct binary path and comment', () => {

        const mockArgv = {
            directories: chance.string()
        };

        const mockPath = chance.string();

        const expectedCommandToExecute = `"${mockPath}/mocha"`;

        pathStub.returns(mockPath);
        testTask.handler(mockArgv);

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

        testTask.handler(mockArgv);

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedDirectories);

    });

    it('should exit with the right code', () => {

        const expectedExitCode = chance.natural();

        const directory1 = chance.string();
        const directory2 = chance.string();

        const mockArgv = {
            directories: `${directory1},${directory2}`
        };

        shellExecStub.callsFake((commandToExecute, callbackFunction) => {

            callbackFunction(expectedExitCode);

        });

        testTask.handler(mockArgv);

        sinon.assert.calledOnce(shellExitStub);
        sinon.assert.calledWithExactly(shellExitStub, expectedExitCode);

    });

});
