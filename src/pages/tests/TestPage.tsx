import {
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Button,
  Box,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { assertUnreachable } from "../../helpers/assertUnreachable";
import { TaskViewer } from "./components/TaskViewer/TaskViewer";
import { TestNavigator } from "./components/TestNavigator/TestNavigator";
import {
  TestResult,
  TestResultCalculator,
} from "./helpers/TestResultCalculator/TestResultCalculator";
import { getTest, TaskDto, TestDto } from "./TestPage.api";

export interface TestPageProps {
  id: string;
}
export interface TestViewProps {
  test: TestDto;
  resultCalculator: TestResultCalculator;
}

export const TestView = (props: TestViewProps) => {
  const { test, resultCalculator } = props;
  const [currentTask, setCurrentTask] = useState<TaskDto>(test.tasks[0]);
  const [answers, setAnswers] = useState(new Map<string, string>());
  const [result, setResult] = useState<TestResult>();

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

    setResult(
      resultCalculator.calculate(correctAnswersCount, test.tasks.length)
    );
  };

  const currentStepIndex = test.tasks.findIndex(
    (task) => task.id === currentTask?.id
  );
  const x = currentStepIndex !== undefined && currentStepIndex > -1;

  const isFirstTask = x ? currentStepIndex === 0 : false;
  const isLastTask =
    x && test.tasks ? currentStepIndex === test.tasks.length - 1 : false;
  const isAnswered = currentTask ? !!answers.get(currentTask.id) : false;

  if (result !== undefined) {
    const percentageScore = result.score * 100;
    return (
      <VStack spacing={3}>
        <Container maxW="container.sm">
          <Box paddingTop={3} paddingBottom={3}>
            <Heading as="h2">{result.title}</Heading>
            <Text fontSize="md">{result.description}</Text>
            <Text fontSize="md">{`Has Passed: ${result.hasPassed}`}</Text>
          </Box>
          <Box paddingTop={3} paddingBottom={3}>
            <CircularProgress value={percentageScore} width="200px">
              <CircularProgressLabel>{`${percentageScore}%`}</CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Button>TODO: implement reset form</Button>
        </Container>
      </VStack>
    );
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
        <TestNavigator
          isFirstTask={isFirstTask}
          isLastTask={isLastTask}
          taskHasAnswer={isAnswered}
          onGotoNextTask={() => handleGoToStep("next")}
          onGotoPreviousTask={() => handleGoToStep("previous")}
          onSubmit={handleSubmitTest}
        />
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

  const testResultCalculator = new TestResultCalculator(
    data.passThreshold,
    data.resultInfos
  );

  return <TestView test={data} resultCalculator={testResultCalculator} />;
};
