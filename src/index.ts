import { issueCommand, issue } from "@actions/core/lib/command";

class GitHubActionsReporter implements jest.Reporter {
  constructor(public globalConfig: jest.GlobalConfig, private options: any) {}

  public onTestStart(test: jest.Test) {}

  public onTestResult(
    test: jest.Test,
    testResult: jest.TestResult,
    results: jest.AggregatedResult
  ) {}

  public onRunComplete(
    contexts: Set<jest.Context>,
    results: jest.AggregatedResult
  ) {
    issue("group", "JEST result");
    if (results.numFailedTests > 0) {
      for (const testResults of results.testResults.filter(
        x => x.numFailingTests > 0
      )) {
        for (const testResult of testResults.testResults) {
          for (const failureMessage of testResult.failureMessages) {
            const x = /\((.+?):(\d+):(\d+)\)/;
            const match = x.exec(failureMessage);
            if (match && match.length > 2) {
              issueCommand(
                "error",
                {
                  file: match[1],
                  line: match[2],
                  col: match[3]
                },
                failureMessage
              );
            }
          }
        }
      }
    }

    issue("endgroup");
  }
}

module.exports = GitHubActionsReporter;
