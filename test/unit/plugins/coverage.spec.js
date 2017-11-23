const {
    expect
} = require('code');
const Chance = require('chance');
const coverageTask = require('../../../lib/plugins/coverage');
const shell = require('shelljs');
const sinon = require('sinon');

describe('Given the coverage task', () => {

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

        const expectedCommand = 'coverage';

        expect(coverageTask.command).equal(expectedCommand);

    });

    it('should execute nyc with the correct binary path', () => {

        const expectedCommandToExecute = 'npx nyc';

        coverageTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedCommandToExecute);

    });

    it('should show you a HTML and text report', () => {

        const expectedReporters = '--reporter=html --reporter=text';

        coverageTask.handler();

        sinon.assert.calledOnce(shellExecStub);
        sinon.assert.alwaysCalledWithMatch(shellExecStub, expectedReporters);

    });

    it('should exit with the right code', () => {

        const expectedExitCode = chance.natural();

        shellExecStub.callsFake((commandToExecute, callbackFunction) => {

            callbackFunction(expectedExitCode);

        });

        coverageTask.handler();

        sinon.assert.calledOnce(shellExitStub);
        sinon.assert.calledWithExactly(shellExitStub, expectedExitCode);

    });

});
