"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@actions/core/lib/command");
class GitHubActionsReporter {
    constructor(globalConfig, options) {
        this.globalConfig = globalConfig;
        this.options = options;
    }
    onTestStart(test) { }
    onTestResult(test, testResult, results) { }
    onRunComplete(contexts, results) {
        if (results.numFailedTests > 0) {
            for (const testResults of results.testResults.filter(x => x.numFailingTests > 0)) {
                for (const testResult of testResults.testResults) {
                    for (const failureMessage of testResult.failureMessages) {
                        const x = /\((.+?):(\d+):(\d+)\)/;
                        const match = x.exec(failureMessage);
                        if (match && match.length > 2) {
                            command_1.issueCommand("error", {
                                file: match[1],
                                line: match[2],
                                col: match[3]
                            }, failureMessage);
                        }
                    }
                }
            }
        }
    }
}
module.exports = GitHubActionsReporter;
