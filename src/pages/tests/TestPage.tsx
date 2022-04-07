import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { TaskViewer } from "./components/TaskViewer/TaskViewer";
import { getTest, TaskDto, TestDto } from "./TestPage.api";

export interface TestPageProps {
  id: string;
}

export const TestPage = (props: TestPageProps) => {
  const { id } = props;

  const { isLoading, error, data } = useQuery<TestDto, Error>(
    ["test", id],
    () => getTest(id)
  );

  const [currentTask, setCurrentTask] = React.useState<TaskDto>()
  const [answers, setAnswers] = React.useState(new Map<string, string>())
  const [result, setResult] = React.useState<number>()

  React.useEffect(() => {
    if(data && data.tasks.length > 0) {
      setCurrentTask(data.tasks[0]);
    }
  }, [data])
    // TODO: pomysł na zadanie zamienić dependency array na [] i dać do przetestowania czemu nie dziala, live zdanie - naprawic i test
    // mona przygotowac zadania w postaci Bugów devopsowych ^^
  
  if (isLoading) {
    return <div>Loading...</div>
  };

  if (error) {
    return <div>An error has occurred: {error.message}</div>
  };

  const updateAnswers = (task: TaskDto, answer: string) => {
    setAnswers(prev => new Map([...prev, [task.id, answer]]))
  }

  const handleGoToStep = (mode: "previous" | "next") => {
    //  TODO: FIX ERRORS (propably useQuery every rerender?)
    
    if (currentTask) {
      const oldIndex = data?.tasks.findIndex(task => task.id === currentTask?.id);

      if(oldIndex !== undefined && oldIndex > -1) {
        const newIndex = mode === "next" ? oldIndex + 1 : oldIndex - 1;
        const newTask = data?.tasks[newIndex];

        if (!newTask) {
          throw new Error("New task not found")
        } else {
          setCurrentTask(newTask);
        }
      }
    }

    throw new Error("Current tak should be specified when click handleGoToNextStep")
  }

  // TODO: Extract to the calculator for the UI test
  const handleSubmitTest = () => {
    let correctAnswersCount = 0;

    if(!data?.tasks) {
      throw new Error("Tasks have to be specified")
    }

    data.tasks.forEach(task => {
      const answer = answers.get(task.id);

      if(!answer) {
        throw new Error("Answer for all tasks should be specified")
      }

      if(answer === task.correctAnswer) {
        correctAnswersCount++;
      }
    })

    setResult(correctAnswersCount / data.tasks.length) // TODO: this is throwing errors
  }

  const currentStepIndex = data?.tasks.findIndex(task => task.id === currentTask?.id);
  const x = currentStepIndex !== undefined && currentStepIndex > -1;

  const isFirstTask = x ? currentStepIndex === 0 : undefined;
  const isLastTask = (x && data?.tasks) ? currentStepIndex === data.tasks.length - 1 : undefined
  const isAnswered = currentTask ? !!answers.get(currentTask.id) : false;

  if (result !== undefined) {
    <div>
      Test finished!
      <p>Result: {result}</p>
    </div>
  }

  return (
    <div>
      <h1>Test Page</h1>
      {(currentStepIndex !== undefined && !!data?.tasks) && (
        <p>{`Task ${currentStepIndex + 1} of ${data?.tasks.length}`}</p>
      )}
      {currentTask ? (
        <>
          <TaskViewer key={currentTask.id} task={currentTask} onChange={updateAnswers} />
          <div>
            <button disabled={isFirstTask} onClick={() => handleGoToStep("previous")}>Go to previous task</button>
            <button>TODO: implement reset form</button>
            {isLastTask ?
              <button disabled={!isAnswered} onClick={handleSubmitTest}>submit test</button>
            :
              <button disabled={!isAnswered} onClick={() => handleGoToStep("next")}>Go to next task</button>
            }
          </div>
        </>
      ) : <div>Loading...</div>}
      {/* TODO: zobaczymy czy ktoś zauwazy ze jak nie bedzie taska to bedzie dozywotni loading + test */}
    </div>
  )
};
