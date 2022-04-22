import { getByRole, getByTestId, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../shared/appProvider/app-provider";
import { TestNavigatorPageObject } from "./components/TestNavigator/TestNavigator.po";
import { TestPage } from "./TestPage";

export class TestPagePageObject {
  elements: {
    answerInput: HTMLInputElement;
    testNavigatorContainer: HTMLElement;
  };

  protected constructor(public rootContainer: HTMLElement) {
    this.elements = {
      get answerInput() {
        return getByRole<HTMLInputElement>(rootContainer, "textbox");
      },
      get testNavigatorContainer() {
        return getByTestId<HTMLElement>(rootContainer, "TestNavigator");
      },
    };
  }

  answerQuestion(answer: string) {
    userEvent.type(this.elements.answerInput, answer);
  }

  getTestNavigatorPageObject() {
    return TestNavigatorPageObject.bindTo(this.elements.testNavigatorContainer);
  }

  static render(testId: string) {
    const { container } = render(
      <AppProvider>
        <TestPage id={testId} />
      </AppProvider>
    );

    return new TestPagePageObject(container);
  }
}
