import { findByRole, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupMockServer } from "../../shared/appProvider/api/mock.server";
import { AppProvider } from "../../shared/appProvider/app-provider";
import { TestPage } from "./TestPage";
import "@testing-library/jest-dom/extend-expect";
import "../../shared/testExtensions/TestExtensions";
import { testId1, testServiceHandlers } from "./TestPage.api.mock";
import { TestPagePageObject } from "./TestPage.po";

describe("TestPage", () => {
  setupMockServer(...testServiceHandlers);

  it("should show test result when user submit the test", async () => {
    // given
    const testPagePO = TestPagePageObject.render(testId1);

    // then
    await testPagePO.rootContainer.expectTextDisplayed("Test Page");
    await testPagePO.rootContainer.expectTextDisplayed("Task 1 out of 3");
    await testPagePO.rootContainer.expectTextDisplayed("Dogs question");

    const testNavigatorPO = testPagePO.getTestNavigatorPageObject();
    // when
    testPagePO.answerQuestion("yes");
    testNavigatorPO.goToNextTask();

    // then
    await testPagePO.rootContainer.expectTextDisplayed("Beer question");
    await testPagePO.rootContainer.expectTextDisplayed("Task 2 out of 3");

    // when
    testPagePO.answerQuestion("yes");
    testNavigatorPO.goToNextTask();

    // then
    await testPagePO.rootContainer.expectTextDisplayed("CSS question");
    await testPagePO.rootContainer.expectTextDisplayed("Task 3 out of 3");

    // when
    testPagePO.answerQuestion("yes");
    testNavigatorPO.submitTest();

    // then
    await testPagePO.rootContainer.expectTextDisplayed("You failed!");
  });
});
