import { HStack, Button } from "@chakra-ui/react";
import React from "react";

interface TestNavigatorProps {
  isFirstTask: boolean;
  isLastTask: boolean;
  taskHasAnswer: boolean;
  onSubmit: () => void;
  onGotoNextTask: () => void;
  onGotoPreviousTask: () => void;
}

export const TestNavigator: React.FC<TestNavigatorProps> = (props) => {
  const {
    isFirstTask,
    isLastTask,
    taskHasAnswer,
    onGotoNextTask,
    onGotoPreviousTask,
    onSubmit,
  } = props;
  return (
    <HStack data-testid="TestNavigator" spacing={2}>
      <Button disabled={isFirstTask} onClick={onGotoPreviousTask}>
        Go to previous task
      </Button>
      {isLastTask ? (
        <Button disabled={!taskHasAnswer} onClick={onSubmit}>
          Submit test
        </Button>
      ) : (
        <Button disabled={!taskHasAnswer} onClick={onGotoNextTask}>
          Go to next task
        </Button>
      )}
    </HStack>
  );
};
