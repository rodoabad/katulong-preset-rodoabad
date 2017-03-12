const {
    expect
} = require('code');
const Chance = require('chance');
const coverageTask = require('../../../lib/plugins/coverage');
const path = require('path');
const shell = require('shelljs');
const sinon = require('sinon');

describe('Given the coverage task', () => {

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

        const expectedCommand = 'coverage';

        expect(coverageTask.command).equal(expectedCommand);

    });

    it('should execute nyc with the correct binary path', () => {

        const mockPath = chance.string();

        const expectedCommandToExecute = `"${mockPath}/nyc"`;

        pathStub.returns(mockPath);
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

});
