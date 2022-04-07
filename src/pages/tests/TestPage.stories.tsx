import React from "react";
import { TestPage, TestPageProps } from "./TestPage";
import { Story, Meta } from "@storybook/react";
import { testId1, testServiceHandlers } from "./TestPage.api.mock";

export default {
  component: TestPage,
  title: "Testing / Test Page",
  parameters: {
    msw: [...testServiceHandlers],
  },
} as Meta<TestPageProps>;

export const Base: Story<TestPageProps> = (props) => <TestPage id={testId1} />;
