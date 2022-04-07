import {
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Button,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { assertUnreachable } from "../../helpers/assertUnreachable";
import { TaskViewer } from "./components/TaskViewer/TaskViewer";
import { getTest, TaskDto, TestDto } from "./TestPage.api";

export interface TestPageProps {
  id: string;
}
export interface TestViewProps {
  test: TestDto;
}

export const TestView = (props: TestViewProps) => {
  const { test } = props;
  const [currentTask, setCurrentTask] = React.useState<TaskDto>(test.tasks[0]);
  const [answers, setAnswers] = React.useState(new Map<string, string>());
  const [result, setResult] = React.useState<number>();

  const updateAnswers = (task: TaskDto, answer: string) => {
    setAnswers((prev) => new Map([...prev, [task.id, answer]]));
  };

  const handleGoToStep = (mode: "previous" | "next") => {
    if (!currentTask) {
      throw new Error(
        "Current task should be specified when click handleGoToNextStep"
      );
    }

    const oldIndex = test.tasks.findIndex(
      (task) => task.id === currentTask?.id
    );

    if (oldIndex !== undefined && oldIndex > -1) {
      const newIndex = mode === "next" ? oldIndex + 1 : oldIndex - 1;
      const newTask = test.tasks[newIndex];

      if (!newTask) {
        throw new Error("New task not found");
      } else {
        setCurrentTask(newTask);
      }
    }
  };

  // TODO: Extract to the calculator for the UI test
  const handleSubmitTest = () => {
    let correctAnswersCount = 0;

    if (!test.tasks) {
      throw new Error("Tasks have to be specified");
    }

    test.tasks.forEach((task) => {
      const answer = answers.get(task.id);

      if (!answer) {
        throw new Error("Answer for all tasks should be specified");
      }

      if (answer === task.correctAnswer) {
        correctAnswersCount++;
      }
    });

    setResult(correctAnswersCount / test.tasks.length);
  };

  const currentStepIndex = test.tasks.findIndex(
    (task) => task.id === currentTask?.id
  );
  const x = currentStepIndex !== undefined && currentStepIndex > -1;

  const isFirstTask = x ? currentStepIndex === 0 : undefined;
  const isLastTask =
    x && test.tasks ? currentStepIndex === test.tasks.length - 1 : undefined;
  const isAnswered = currentTask ? !!answers.get(currentTask.id) : false;

  if (result !== undefined) {
    <div>
      <Heading as="h2">Test Finished!</Heading>
      <p>Result: {result}</p>
    </div>;
  }

  return (
    <VStack spacing={3}>
      <Container maxW="container.sm">
        <Box paddingTop={3} paddingBottom={3}>
          <Heading as="h1">Test Page</Heading>
          <Text fontSize="md">
            Task {currentStepIndex + 1} out of {test.tasks.length}
          </Text>
        </Box>
        <TaskViewer
          key={currentTask.id}
          task={currentTask}
          onChange={updateAnswers}
        />
        <HStack spacing={2}>
          <Button
            disabled={isFirstTask}
            onClick={() => handleGoToStep("previous")}
          >
            Go to previous task
          </Button>
          <Button>TODO: implement reset form</Button>
          {isLastTask ? (
            <Button disabled={!isAnswered} onClick={handleSubmitTest}>
              submit test
            </Button>
          ) : (
            <Button
              disabled={!isAnswered}
              onClick={() => handleGoToStep("next")}
            >
              Go to next task
            </Button>
          )}
        </HStack>
      </Container>
    </VStack>
  );
};

export const TestPage = (props: TestPageProps) => {
  const { id } = props;

  const { isLoading, error, data } = useQuery<TestDto, Error>(
    ["test", id],
    () => getTest(id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  if (!data) {
    return assertUnreachable(data);
  }

  return <TestView test={data} />;
};
