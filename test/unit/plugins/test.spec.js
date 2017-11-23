const {
    expect
} = require('code');
const Chance = require('chance');
const testTask = require('../../../lib/plugins/test');
const shell = require('shelljs');
const sinon = require('sinon');

describe('Given the test task', () => {

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

        const expectedCommand = 'test';

        expect(testTask.command).equal(expectedCommand);

    });

    it('should execute mocha with the correct binary path and comment', () => {

        const expectedCommandToExecute = 'npx mocha';

        testTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedCommandToExecute);

    });

    it('should parse the directories passed correctly', () => {

        const expectedDefaultDirectories = 'test/unit';

        testTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedDefaultDirectories);

    });

    it('should exit with the right code', () => {

        const expectedExitCode = chance.natural();

        shellExecStub.callsFake((commandToExecute, callbackFunction) => {

            callbackFunction(expectedExitCode);

        });

        testTask.handler();

        sinon.assert.calledOnce(shellExitStub);
        sinon.assert.calledWithExactly(shellExitStub, expectedExitCode);

    });

});
