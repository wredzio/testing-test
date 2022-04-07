import { rest } from "msw";
import { TestDto } from "./TestPage.api";

export const testId1 = "testId1";

const test1: TestDto = {
  id: testId1,
  tasks: [
    { id: "1", _type: "Input", question: "Do you like dogs?", title: "Dogs question", correctAnswer: "yes" },
    { id: "2", _type: "Input", question: "Are you going to drink today?", title: "Beer question", correctAnswer: "jeszcze jak" },
    { id: "3", _type: "Input", question: "Do you tolerate CSS? 😈", title: "CSS question", correctAnswer: "no" },
    // { _type: "Checkbox", numberOfCheckbox: 2, title: "Second question" },
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
