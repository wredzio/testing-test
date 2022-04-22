import { waitFor } from "@testing-library/react";
import { TestNavigatorPageObjectStandalone } from "./TestNavigator.po";

describe("TestNavigator", () => {
  it("should call goto next task, when...", async () => {
    // given
    const TestNavigatorPO = TestNavigatorPageObjectStandalone.render(
      true,
      false,
      true
    );

    // when
    TestNavigatorPO.goToNextTask();

    // then
    return waitFor(() => {
      expect(TestNavigatorPO.onGoToNextTaskSpy).toHaveBeenCalled();
    });
  });
});
