import { rest } from "msw";
import { TestDto } from "./test-api";

export const testId1 = "testId1";

const test1: TestDto = {
  id: testId1,
  tasks: [
    { _type: "Input", question: "Do you like dogs" },
    { _type: "Checkbox", numberOdCheckbox: 2 },
  ],
};

export const testServiceHandlers = [
  rest.post(`/api/test`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get<TestDto[]>(`/api/test/${testId1}`, async (req, res, ctx) => {
    return res(ctx.json(test1));
  }),
];
