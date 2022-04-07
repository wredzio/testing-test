import random from "lodash/random";
import { Percentage } from "../../../../helpers/formatProgress";
import { TestResult, TestResultCalculator } from "./TestResultCalculator";
import { generateFailResultInfos, successResultInfo } from "./TestResultCalculator.mock";

interface TestResultCalculatorTestCase {
  totalTasks: number;
  correctTask: number;
  passThreshold: Percentage;
  numberOfFailResultInfos: number;
  expectedResult: TestResult;
}

describe("TestResultCalculator", () => {
  const maxNumberOfFailResultInfos = 5;
  const failResultInfos = generateFailResultInfos(maxNumberOfFailResultInfos);

  // Thanks to the test I know that passTresholds should be specified in numbers 0-100 not 0-1
  const testCases: TestResultCalculatorTestCase[] = [
    {
      totalTasks: 10,
      correctTask: 5,
      passThreshold: 30,
      numberOfFailResultInfos: random(1, maxNumberOfFailResultInfos),
      expectedResult: { hasPassed: true, score: 0.5, ...successResultInfo },
    },
    {
      totalTasks: 10,
      correctTask: 5,
      passThreshold: 60,
      numberOfFailResultInfos: 1,
      expectedResult: { hasPassed: false, score: 0.5, ...failResultInfos[0] },
    },
    {
      totalTasks: 10,
      correctTask: 4,
      passThreshold: 60,
      numberOfFailResultInfos: 2,
      expectedResult: { hasPassed: false, score: 0.4, ...failResultInfos[1] },
    },
    {
      totalTasks: 10,
      correctTask: 7,
      passThreshold: 80,
      numberOfFailResultInfos: 5,
      expectedResult: { hasPassed: false, score: 0.7, ...failResultInfos[4] },
    },
    {
      totalTasks: 10,
      correctTask: 0,
      passThreshold: 80,
      numberOfFailResultInfos: 5,
      expectedResult: { hasPassed: false, score: 0, ...failResultInfos[0] },
    },
  ];

  testCases.forEach(testCase => {
    it(`for 
    number of total tasks: ${testCase.totalTasks},
    number of correct tasks: ${testCase.correctTask}, 
    pass threshold: ${testCase.passThreshold},
    numberOfFailedResults: ${testCase.numberOfFailResultInfos}
    should return ${JSON.stringify(testCase.expectedResult)}`, async () => {
      const resultInfos = [...failResultInfos.slice(0, testCase.numberOfFailResultInfos), successResultInfo];
      const testResultCalculator = new TestResultCalculator({ value: testCase.passThreshold }, resultInfos);
      const testResult = testResultCalculator.calculate(testCase.correctTask, testCase.totalTasks);

      expect(testResult).toEqual(testCase.expectedResult);
    });
  });

  describe("should throw an error", () => {
    const testResultCalculator = new TestResultCalculator({ value: 0 }, []);

    it.todo("if number of correct tasks is less than 0");

    it.todo("if number of total tasks is less or equal to 0");

    it.todo("if number of correct tasks is greater that number of total tasks");
  });
});
