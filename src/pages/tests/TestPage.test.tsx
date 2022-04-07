import { findByRole, render } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { setupMockServer } from '../../shared/appProvider/api/mock.server';
import { AppProvider } from '../../shared/appProvider/app-provider';
import { TestPage } from './TestPage';
import "@testing-library/jest-dom/extend-expect";
import { testId1, testServiceHandlers } from './TestPage.api.mock';

describe("TestPage", () => {

  setupMockServer(...testServiceHandlers);

  it("should show test result when user submit the test", async () => {
    // given
    const { findByText, findByRole, getByRole } = render(
      <AppProvider>
        <TestPage id={testId1} />
      </AppProvider>
    );

    // then
    await findByText("Test Page");

    // then
    expect(getByRole("button", { name: "Go to next task" })).toBeDisabled();

    // when
    const task1Input = getByRole("textbox", {
      name: "Do you like dogs?",
    }) as HTMLInputElement;
    userEvent.type(task1Input, "yes");
    userEvent.click(getByRole("button", { name: "Go to next task" }));

    // then
    const task2Input = (await findByRole("textbox", {
      name: "Are you going to drink today?",
    })) as HTMLInputElement;

    // when
    userEvent.type(task2Input, "yes");
    userEvent.click(getByRole("button", { name: "Go to next task" }));

    // then
    const task3Input = (await findByRole("textbox", {
      name: "Do you tolerate CSS? 😈",
    })) as HTMLInputElement;

    // when
    userEvent.type(task3Input, "yes");
    userEvent.click(getByRole("button", { name: "submit test" }));

    // then
    await findByText("You failed!");
  });
});
