import clamp from "lodash/clamp";
import last from "lodash/last";
import { formatProgress, Percentage } from "../../../../helpers/formatProgress";
import { PassThresholdDto, ResultInfoDto } from "../../TestPage.api";

export type TestResultInfo = ResultInfoDto;
export type PassThreshold = PassThresholdDto;

export interface TestResult extends TestResultInfo {
  score: Percentage;
  hasPassed: boolean;
}

export class TestResultCalculator {
  private get testResultInfoForFailedTestCount() {
    return this.testResultInfo.length - 1; // - 1 because of the one test result for passed exam
  }

  private get percentagePassThreshold(): Percentage {
    const passThreshold = this.passThreshold.value;

    return clamp(passThreshold, 0, 100);
  }

  constructor(private passThreshold: PassThreshold, private testResultInfo: TestResultInfo[]) {}

  calculate(correctTasks: number, totalTasks: number): TestResult {
    const { progressValue, unitInterval } = formatProgress(correctTasks / totalTasks);
    const score = unitInterval;
    const passedResultInfo = last(this.testResultInfo);

    if (progressValue >= this.percentagePassThreshold && passedResultInfo) {
      return { score, hasPassed: true, ...passedResultInfo };
    }

    return {
      score,
      hasPassed: false,
      ...this.testResultInfo[this.getTestResultInfoIndexForScore(this.testResultInfoForFailedTestCount, progressValue)],
    };
  }

  private getTestResultInfoIndexForScore(testResultInfoForFailedTestCount: number, score: Percentage) {
    const threshold = this.percentagePassThreshold / testResultInfoForFailedTestCount;
    return Math.floor(score / threshold);
  }
}
