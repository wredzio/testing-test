import { getByRole, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { unsafe_cast } from "../../../../helpers/typeUtils";
import { AppProvider } from "../../../../shared/appProvider/app-provider";
import { TestNavigator } from "./TestNavigator";

export class TestNavigatorPageObject {
  elements: {
    goToNextTaskButton: HTMLElement;
    submitTestButton: HTMLElement;
  };

  protected constructor(public rootContainer: HTMLElement) {
    this.elements = {
      get goToNextTaskButton() {
        return getByRole<HTMLElement>(rootContainer, "button", {
          name: "Go to next task",
        });
      },
      get submitTestButton() {
        return getByRole<HTMLElement>(rootContainer, "button", {
          name: "Submit test",
        });
      },
    };
  }

  static bindTo(container: HTMLElement) {
    return new TestNavigatorPageObject(
      unsafe_cast.ElementToHTMLElement(container)
    );
  }

  goToNextTask() {
    userEvent.click(this.elements.goToNextTaskButton);
  }

  submitTest() {
    userEvent.click(this.elements.submitTestButton);
  }
}

export class TestNavigatorPageObjectStandalone extends TestNavigatorPageObject {
  protected constructor(
    public rootContainer: HTMLElement,
    public onSubmitSpy: jest.Mock,
    public onGoToNextTaskSpy: jest.Mock,
    public onGoToPreviousTaskSpy: jest.Mock
  ) {
    super(rootContainer);
  }

  static render(
    isFirstTask: boolean,
    isLastTask: boolean,
    taskHasAnswer: boolean
  ) {
    const onSubmit = jest.fn();
    const onGoToNextTask = jest.fn();
    const onGoToPreviousTask = jest.fn();

    const { container } = render(
      <AppProvider>
        <TestNavigator
          isFirstTask={isFirstTask}
          isLastTask={isLastTask}
          taskHasAnswer={taskHasAnswer}
          onSubmit={onSubmit}
          onGotoNextTask={onGoToNextTask}
          onGotoPreviousTask={onGoToPreviousTask}
        />
      </AppProvider>
    );

    return new TestNavigatorPageObjectStandalone(
      container,
      onSubmit,
      onGoToNextTask,
      onGoToPreviousTask
    );
  }
}
