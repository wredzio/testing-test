import React from "react";
import { TestPage, TestPageProps } from "./test-page";
import { Story, Meta } from "@storybook/react";
import { testId1, testServiceHandlers } from "./test-api.mock";

export default {
  component: TestPage,
  title: "Testing / Test Page",
  parameters: {
    msw: [...testServiceHandlers],
  },
} as Meta<TestPageProps>;

export const Base: Story<TestPageProps> = (props) => <TestPage id={testId1} />;
